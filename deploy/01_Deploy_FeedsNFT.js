let { networkConfig } = require('../helper-hardhat-config')
const { convertToURI } = require('../scripts/convert-to-svg-uri')
const fs = require('fs')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const EthUsdAggregator = await deployments.get('EthUsdAggregator')
        ethUsdPriceFeedAddress = EthUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
    }
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one below is ETH/USD contract on Kovan
    let highValue = '200000000000' // $2,000

    log("----------------------------------------------------")
    let lowSVG = await fs.readFileSync("./img/svg/thumbsdown.svg", { encoding: "utf8" })
    let highSVG = await fs.readFileSync("./img/svg/thumbsup.svg", { encoding: "utf8" })
    let _args = [ethUsdPriceFeedAddress]
    console.log(`Here are your args ${_args}`)
    const feedsNFT = await deploy('FeedsNFT', {
        from: deployer,
        args: _args,
        log: true
    })
    log(`You have deployed an NFT contract to ${feedsNFT.address}`)
    const FeedsNFT = await ethers.getContractFactory("FeedsNFT")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const feedsNFTContract = new ethers.Contract(feedsNFT.address, FeedsNFT.interface, signer)
    const networkName = networkConfig[chainId]['name']

    log(`Verify with npx hardhat verify --network ${networkName} ${feedsNFT.address} "${ethUsdPriceFeedAddress}"`)
    log("Adding low URI...")
    let tx = await feedsNFTContract.addLowSVG(lowSVG)
    await tx.wait(1)
    log("Adding high URI...")
    tx = await feedsNFTContract.addHighSVG(highSVG)
    await tx.wait(1)
    log("Creating NFT...")
    tx = await feedsNFTContract.create(highValue)
    await tx.wait(1)
    log(`You've made your first NFT!`)
    log(`Here is the NFT tokenURI: ${await feedsNFTContract.tokenURI(0)}`)
}

module.exports.tags = ['all', 'feed', 'main']
