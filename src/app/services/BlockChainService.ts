import { Injectable } from "@angular/core";
import { Block } from '../Models/Block';
import * as shajs from 'sha.js'
import { UserService } from './UserService';

@Injectable()
export class BlockChainService{
    public blockChain: Array<Block> = [];
    public isSearching = false

    constructor(private userService: UserService){ 
    }

    public verifyBlock(block: Block){
        if(this.blockChain.find(b => b.index == block.index-1)){
                let blockToString = JSON.stringify(block)
                let hash =  shajs('sha256').update(blockToString).digest('hex')
                if(hash.slice(0, 4) == "0000"){
                    return true
                }
            }
            return false
        }

    public findProofOfWork(block: Block) {
        let findProofOfWork = false
        while (!findProofOfWork) {
            block.proofOfWork = this.randomString(7);
            let blockToString = JSON.stringify(block)
            let hash = shajs('sha256').update(blockToString).digest('hex')
            if (hash.slice(0, 4) != "0000") {
                continue;
            }
            findProofOfWork = true;
        }
        console.log("find proof of work " + block.proofOfWork)
        return block
    }

    public initFirstBlock() {
        //TODO real check for signature
        let block: Block = {
            index: 1,
            data: {
                message: "this is my first block"
            },
            timestamp: Date.now(),
            signature: this.userService.currentUser.hash,
            proofOfWork: "empty",
            previousHash: "empty",
            hash: ""
        }
        block.hash = shajs('sha256').update(JSON.stringify(block)).digest('hex')
        this.blockChain.push(block)
    }

    private randomString(length){
        let result = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (let i = 0; i < charactersLength; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }
}