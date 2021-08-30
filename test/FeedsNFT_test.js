const { expect } = require('chai')
const chai = require('chai')
const BN = require('bn.js')
const skipIf = require('mocha-skip-if')
chai.use(require('chai-bn')(BN))
const { deployments, getChainId } = require('hardhat')
const { networkConfig, developmentChains } = require('../helper-hardhat-config')

skip.if(!developmentChains.includes(network.name)).
  describe('FeedsNFT Unit Tests', async function () {
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    let feedsNFT

    beforeEach(async () => {
      await deployments.fixture(['mocks', 'feed'])
      const FeedsNFT = await deployments.get("FeedsNFT")
      feedsNFT = await ethers.getContractAt("FeedsNFT", FeedsNFT.address)
    })

    // it('should return correct uri', async () => {
    //   let result = await feedsNFT.getLatestPrice()
    //   console.log("Price Feed Value: ", new web3.utils.BN(result._hex).toString())
    //   expect(new web3.utils.BN(result._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new web3.utils.BN(0))
    // })
  })
