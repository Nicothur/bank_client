import { Injectable, isDevMode } from '@angular/core';
import { Block } from '../Models/Block';
import * as shajs from 'sha.js';
import { UserService } from './UserService';
import { Observable, of } from 'rxjs';
import { Transaction } from '../Models/Transaction';

@Injectable()
export class BlockChainService {
  public blockChain: Object = {};
  public isSearching = false;

  public findedProofOfWork: boolean;
  public orderToStop: boolean;
  public orderToRehash: boolean;
  public currentMinedBlock: Block;

  public fakeBlock: Block;

  constructor(private userService: UserService) {}

  private setAccordingToLastBlock() {
    let length = 0;
    for (let property in this.blockChain) {
      length++;
    }
    if (this.blockChain[length]) {
      return length + 1;
    }
    throw 'Invalide Blockchain';
  }

  public calculateBlock(block: Block) {
    let length = this.setAccordingToLastBlock();
    block.proofOfWork = '';
    block.index = length;
    block.previousHash = this.blockChain[length - 1].hash;
    block.hash = shajs('sha256')
      .update(JSON.stringify(block))
      .digest('hex');
  }

  public async receivedBlock(block: Block) {
    if (await this.verifyBlock(block) || !isDevMode()) {
      this.blockChain[block.index] = block;
      this.getMyTokenAndTransaction();
      if(this.currentMinedBlock){
        this.currentMinedBlock.proofOfWork = block.proofOfWork;
        if (this.currentMinedBlock == block) {
          this.orderToStop = true;
        } else {
          this.orderToRehash = true;
        }
      }
    }
  }

  public verifyBlock(block: Block) {
    if (this.blockChain[block.index - 1]) {
      let blockToString = JSON.stringify(block);
      let hash = shajs('sha256')
        .update(blockToString)
        .digest('hex');
      if (hash.slice(0, 2) == '00') {
        return true;
      }
    }
    return false;
  }

  private calculate(block: Block) {
    block.proofOfWork = this.randomString();
    let blockToString = JSON.stringify(block);
    let proof = shajs('sha256')
      .update(blockToString)
      .digest('hex');
    if (proof.slice(0, 2) != '00') {
      return false;
    }
    return true;
  }

  public findProofOfWork(block: Block) {
    this.currentMinedBlock = block;
    setTimeout(async () => {
      this.findedProofOfWork = await this.calculate(block);
      if (this.orderToStop) {
        this.orderToStop = false;
        this.currentMinedBlock == null;
        return;
      } else if (this.orderToRehash) {
        block.proofOfWork = '';
        this.calculateBlock(block);
        this.orderToRehash = false;
        this.findProofOfWork(block);
        return;
      }
      if (!this.findedProofOfWork) {
        this.findProofOfWork(block);
      } else {
        if (await this.verifyBlock(block)) {
          this.blockChain[block.index] = block;
          this.getMyTokenAndTransaction();
          this.currentMinedBlock == null;
          if (block.signature != 'test') {
            this.sendNewBlock(block);
          }
          //TODO spread to others
        }
      }
    }, 0);
  }

  public initFirstBlock() {
    //TODO real check for signature
    let block: Block = {
      index: 1,
      data: {
        amount: 2,
        date: new Date(Date.now()),
        receiver: this.userService.currentUser.accountId,
        sender: 'no one'
      },
      signature: this.userService.currentUser.hash,
      proofOfWork: 'empty',
      previousHash: 'empty',
      hash: 'no hash'
    };
    block.hash = shajs('sha256')
      .update(JSON.stringify(block))
      .digest('hex');
    this.blockChain[block.index] = block;
  }

  private randomString() {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public getMyTokenAndTransaction() {
    this.userService.currentUser.transactions = [];
    this.userService.currentUser.tokens = 0;
    for (let id in this.blockChain) {
      let transaction: Transaction = this.blockChain[id].data;
      if (transaction.receiver == this.userService.currentUser.accountId) {
        this.userService.currentUser.transactions.push(transaction);
        this.userService.currentUser.tokens += transaction.amount;
      } else if (transaction.sender == this.userService.currentUser.accountId) {
        this.userService.currentUser.transactions.push(transaction);
        this.userService.currentUser.tokens -= transaction.amount;
      }
    }
  }

  public async sendNewBlock(block: Block) {
    let data = JSON.stringify({
      type: 'newBlock',
      from: this.userService.currentUser.hash,
      block: block
    });
    this.userService.peer.send(data);
  }

  public async askBlockChain() {
    let data = JSON.stringify({
      type: 'askBlockChain',
      from: this.userService.currentUser.hash
    });
    this.userService.peer.send(data);
  }

  public async sendForMining(block: Block) {
    let data = JSON.stringify({
      type: 'mine',
      from: this.userService.currentUser.hash,
      block: block
    });
    this.userService.peer.send(data);
  }

  public async manageEnteringMessage(data) {
    let body = JSON.parse(data);
    if (body.from == this.userService.currentUser.hash) {
      return;
    }
    switch (body.type) {
      case 'askBlockChain':
        this.userService.peer.send(
          JSON.stringify({
            type: 'sendBlockChain',
            from: this.userService.currentUser.hash,
            data: this.blockChain
          })
        );
        break;
      case 'sendBlockChain':
        this.receiveNewBlockChain(body.data);
        break;
      case 'mine':
        if(this.userService.isMining){
          this.findProofOfWork(body.block);
        }
        break;
      case 'newBlock':
        this.receivedBlock(body.block);
        break;
    }
  }

  public async receiveNewBlockChain(blockChain: Object) {
    let lengthNewBlockChain = 0;
    let lengthMyBlockChain = 0;
    for (let element in blockChain) {
      lengthNewBlockChain++;
    }
    for (let element in this.blockChain) {
      lengthMyBlockChain++;
    }
    if (lengthNewBlockChain > lengthMyBlockChain) {
      this.blockChain = blockChain;
      if (this.currentMinedBlock != null) {
        this.orderToRehash = true;
      }
    }
  }

  /*
   * For test
   */

  public mineABlock() {
    setTimeout(() => {
      console.log('Starting to mine');
      this.fakeBlock = {
        data: {
          amount: 2,
          date: new Date(Date.now()),
          receiver: this.userService.currentUser.hash,
          sender: '246175000400'
        },
        signature: 'test',
        index: 0,
        previousHash: '',
        proofOfWork: '',
        hash: ''
      };

      try {
        this.calculateBlock(this.fakeBlock);
        this.findProofOfWork(this.fakeBlock);
      } catch (err) {
        console.log(err);
      }
    }, 2000);
  }

  public getInterruptedBySameBlock() {
    setTimeout(async () => {
      console.log('pushing a block');
      await this.receivedBlock(this.currentMinedBlock);
    }, 3000);
  }

  public getInterruptedNotBySameBlock() {
    setTimeout(async () => {
      console.log('pushing a block');
      let tempBlock = {
        data: {
          amount: 1,
          date: this.currentMinedBlock.data.date,
          receiver: this.userService.currentUser.hash,
          sender: '246175000400'
        },
        signature: this.userService.currentUser.hash,
        index: this.currentMinedBlock.index,
        previousHash: this.currentMinedBlock.previousHash,
        proofOfWork: this.currentMinedBlock.proofOfWork,
        hash: this.currentMinedBlock.hash
      };
      await this.receivedBlock(tempBlock);
    }, 3000);
  }
}
