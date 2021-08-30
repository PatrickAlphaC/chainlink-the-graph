const { expect } = require('chai')
const chai = require('chai')
const BN = require('bn.js')
const skipIf = require('mocha-skip-if')
chai.use(require('chai-bn')(BN))
const fs = require('fs')
const { deployments, getChainId } = require('hardhat')
const { networkConfig, developmentChains } = require('../helper-hardhat-config')

skip.if(!developmentChains.includes(network.name)).
  describe('FeedsNFT Unit Tests', async function () {
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    let feedsNFT, lowSVG, highSVG

    beforeEach(async () => {
      await deployments.fixture(['mocks', 'feed'])
      const FeedsNFT = await deployments.get("FeedsNFT")
      feedsNFT = await ethers.getContractAt("FeedsNFT", FeedsNFT.address)
      lowSVG = await fs.readFileSync("./img/svg/thumbsdown.svg", { encoding: "base64" })
      highSVG = await fs.readFileSync("./img/svg/thumbsdown.svg", { encoding: "base64" })
    })

    it('should return the correct URI', async () => {

      let expectedURI = fs.readFileSync("./test/data/thumbsUpURI.txt", "utf8")
      let uri = await feedsNFT.tokenURI(0)
      console.log(expectedURI)
      console.log(uri)
      expect(uri == expectedURI).to.be.true
    })
  })
