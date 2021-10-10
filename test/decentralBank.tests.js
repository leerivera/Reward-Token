const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
      let tether, rwd, decentralBank

      function tokens(number) {
          return web3.utils.toWei(number, 'ether')
      }

      before(async () => {
          //load contracts
          tether = await Tether.new()
          rwd = await RWD.new()
          decentralBank = await DecentralBank.new(rwd.address, tether.address)

          // Transfer all tokens to Decentalbank
          await rwd.transfer(decentralBank.address, tokens('1000000'))

          // Transfer 100 mock Tethers to customer
          await tether.transfer(customer, tokens('100'), {from: owner})

      })

      
}