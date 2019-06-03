const { Block } = require("./models/block")

class BCUtils{

    //Stockage de la block chain avec initialization
    constructor() {
        this.blockChain = [this.getFirstBlock()];
    }

    //Calcule le HASH d'un Block
    calculateHash(index, previousHash, timestamp, data){
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
    };

    //Calcule le premier block afin d'initialiser la block chain
    getFirstBlock(){
        
    }

    

    //Génère le block avec les datas
    generateNextBlock(blockData) {
        var previousBlock = getLastBlock();
        var nextIndex = previousBlock.index + 1;
        var nextTimestamp = new Date().getTime() / 1000
        var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimeStamp, blockData);
        return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash)
    }

    //Le hash à partir d'un block
    calculateHashForBlock (block) {
        return CryptoJS.SHA256(block.index + block.previousHash + block.timestamp + block.data).toString();
    }

    //Check si le block entrant est valide par rapport au block précédent
    isValidNewBlock (newBlock, previousBlock) {
        if (previousBlock.index + 1 !== newBlock.index) {
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash) {
            return false;
        } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
            console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
            console.log('hash invalide: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
            return false;
        }
        return true;
    }

    //Check si la block chain entrante est valide
    isValidChain (blockchainToValidate) {
        if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(getGenesisBlock())) {
            return false;
        }
        var tempBlockChain = [blockchainToValidate[0]];
        for (var i = 1; i < blockchainToValidate.length; i++) {
            if (isValidNewBlock(blockchainToValidate[i], tempBlockChain[i - 1])) {
                tempBlockChain.push(blockchainToValidate[i]);
            } else {
                return false;
            }
        }
        return true;
    }

    //Replace la block chain courante si la block chain entrante est plus complète
    replaceChain (newBlockChain) {
        if (isValidChain(newBlockChain) && newBlockChain.length > blockchain.length) {
            blockchain = newBlockChain;
            broadcast(responseLatestMsg());
        }
    }
}


module.exports = {
    BCUtils
}