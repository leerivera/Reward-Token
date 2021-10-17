const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function issueRewards(callback) {
    let decentralBank = await DecentralBank.deployed()
    console.log("tokens issued")
    callback()
}