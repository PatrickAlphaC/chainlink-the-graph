let { networkConfig } = require('../helper-hardhat-config')
// const { convertToURI } = require('../scripts/convert-to-svg')
const fs = require('fs')

async function convertToURI(filename) {
    let base64 = fs.readFileSync(filename, { encoding: "base64" })
    let fullURI = `data:image/png;base64,${base64}`
    return fullURI
}

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
    let med = '500000000000' // $5,000
    let high = '1000000000000' // $5,000

    log("----------------------------------------------------")
    let lowURI = await convertToURI("./img/png/lower.png")
    let medURI = await convertToURI("./img/png/low.png")
    // let highURI = await convertToURI("./img/png/high.png")
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

    log(`Verify with "npx hardhat verify --network ${networkName} ${feedsNFT.address} "${ethUsdPriceFeedAddress}"`)
    log("Adding low URI...")
    let tx = await feedsNFTContract.addLowURI(lowURI)
    await tx.wait(1)
    log("Adding high URI...")
    tx = await feedsNFTContract.addHighURI(medURI)
    await tx.wait(1)
    log("Creating NFT...")
    tx = await feedsNFTContract.create(high)
    await tx.wait(1)
    log(`You've made your first NFT!`)
}

module.exports.tags = ['all', 'feed', 'main']
