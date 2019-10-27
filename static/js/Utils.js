function printBlock(block) {
    console.log("Block number     : " + block.number + "\n"
            + " hash            : " + block.hash + "\n"
            + " parentHash      : " + block.parentHash + "\n"
            + " nonce           : " + block.nonce + "\n"
            + " logsBloom       : " + block.logsBloom + "\n"
            + " transactionsRoot: " + block.transactionsRoot + "\n"
            + " stateRoot       : " + block.stateRoot + "\n"
            + " miner           : " + block.miner + "\n"
            + " difficulty      : " + block.difficulty + "\n"
            + " totalDifficulty : " + block.totalDifficulty + "\n"
            + " extraData       : " + block.extraData + "\n"
            + " size            : " + block.size + "\n"
            + " gasLimit        : " + block.gasLimit + "\n"
            + " gasUsed         : " + block.gasUsed + "\n"
            + " timestamp       : " + block.timestamp + "\n"
            + " transactions    : " + block.transactions + "\n"
            + " uncles          : " + block.uncles);
}
