const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')

module.exports = async function(deployer, network, accounts) {
    // Deploy Mock Tether
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

    //deploy RWD token
    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    // Deploy Decentral bank
    await deployer.deploy(DecentralBank, rwd.address, tether.address)
    const decentralBank = await DecentralBank.deployed()

    //Transfer all tokens to Dbank 1 million

    await rwd.transfer(decentralBank.address, '1000000000000000000000000')

    // Transfer 100 Mock Tether tokens to investor

    await tether.transfer(accounts[1], '10000000000000000000000000000')
}



