const { assert } = require('chai')

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

      describe('Mock Tether Deployment', async () => {
          it("natches name succefully", async () => {
               const name = await tether.name()
               assert.equal(name, 'Mock Tether Token')
          })
      })

      describe('Reward Token Deployment', async () => {
          it('matches name sucessfully', async () => {
              const name = await rwd.name()
              assert.equal(name, 'Reward Token')
          })
      })

      describe('Yeild Farming', async () => {
          it('reward token for staking', async () => {
              let result;

              // get investor balanaces
              result = await tether.balanceOf()
              assert.equal(result.toString(), tokens(100),),

              // check staking for cust of 100 tokens  
              await tether.approve(decentralBank.address, tokens('100'),{from: customer})
              await decentralBank.depositTokens(tokens('100'), {from: customer}),
              // check updated balance of customer
              result = await tether.balanceOf(customer)
              assert.equal(result.toString(), tokens('0')),
              // check updated balance of decentbank
              result = await tether.balanceOf(decentralBank)
              assert.equal(result.toString(), tokens('100')),
              // staking update
              result = await tether.isStaking(customer)
              assert.equal(result.toString(), 'true', 'customer status is staking'),
              // issue tokens
              await decentralBank.issueTokens({from: owner})
              
              await decentralBank.issueTokens({from: customer}).should.be.rejected; 
              // unstake tokens
              await decentralBank.unstakeToken({from: customer})

              result = tether.balanceOf(customer)
              assert.equal(result.toString(), tokens('100')),

              // check updated balance of decentralbank

              result = tether.balanceOf(decentralBank)
              assert.equal(result.toString(), tokens('0')),
                                             
              // is staking updated
              result = tether.balanceOf(customer)
              assert.equal(result.toString(), 'true')







              
          })
      })

      
}