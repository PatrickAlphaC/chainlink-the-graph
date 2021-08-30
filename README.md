<br/>
<p align="center">
<a href="https://ethereum.org/en/" target="_blank">
<img src="./img/png/thumbsup.png" width="225" alt="Low logo">
</a>
<a href="https://ethereum.org/en/" target="_blank">
<img src="./img/png/thumbsdown.png" width="225" alt="Low logo">
</a>
</p>
<br/>

# Feeds NFT
This is a demo repo showing you how to create NFTs that are dynamic based on price. 

 - [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts)

 ## Requirements

- [NPM](https://www.npmjs.com/) or [YARN](https://yarnpkg.com/)

## Installation

Set your `RINKEBY_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). You can get one for free at [Infura's site.](https://infura.io/) You'll also need to set the variable `PRIVATE_KEY` which is your private key from you wallet, ie MetaMask. This is needed for deploying contracts to public networks.

You can set these in your `.env` file if you're unfamiliar with how setting environment variables work. Check out our [.env example](https://github.com/smartcontractkit/hardhat-starter-kit/blob/main/.env.example). If you wish to use this method to set these variables, update the values in the .env.example file, and then rename it to '.env'

![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+) **WARNING** ![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+)

Don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

`.env` example:
```
RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
PRIVATE_KEY='abcdef'
MAINNET_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-api-key"
```
`bash` example
```
export RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
export MNEMONIC='cat dog frog...'
export MAINNET_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-api-key"
```

If you plan on deploying to a local [Hardhat network](https://hardhat.org/hardhat-network/) that's a fork of the Ethereum mainnet instead of a public test network like Kovan, you'll also need to set your `MAINNET_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html) and uncomment the `forking` section in `hardhat.config.js`. You can get one for free at [Alchemy's site.](https://alchemyapi.io/).

You can also use a `PRIVATE_KEY` instead of a `MNEMONIC` environment variable by uncommenting the section in the `hardhat.config.js`, and commenting out the `MNEMONIC` line.

Then you can install all the dependencies

```bash
git clone https://github.com/patrickalphac/chainlink-the-graph/
cd chainlink-the-graph
```
then

```bash
npm install
```

Or

```bash
yarn
```


## Deploy

Deployment scripts are in the [deploy](https://github.com/smartcontractkit/hardhat-starter-kit/tree/main/deploy) directory. If required, edit the desired environment specific variables or constructor parameters in each script, then run the hardhat deployment plugin as follows. If no network is specified, it will default to the Kovan network.

This will deploy to a local hardhat network.

```bash
npx hardhat deploy
```

To deploy to testnet:
```bash
npx hardhat deploy --network rinkeby
```

# Create NFT & View on OpenSea

Once deployed, you can run a script to create a new NFT. It'll look something like this: 

[Feeds NFT Opensea](https://testnets.opensea.io/assets/0x2695C58d06501A0f62d3c80e3009DFc655632f7c/0)

This will:
1. Deploy our NFT Feeds contract
2. Add a thumbsup and thumbsdown svg as our 2 imageURIs
3. Create 1 NFT 

## Important notes for SVGs

1. Make sure all the double quotes are single quotes

Using SVGs will allow you to make all the drawings directly on-chain, and store them on chain too! For example, you could store an SVG as a string, and then edit it to change your drawings. 

## Other Notes

1. I wasn't able to make `data:image/png` types work as an imageURI, but hypothetically it should. 

## Test
Tests are located in the [test](https://github.com/smartcontractkit/hardhat-starter-kit/tree/main/test) directory, and are split between unit tests and integration tests. Unit tests should only be run on local environments, and integration tests should only run on live environments.

To run unit tests:

```bash
npx harhat test
```


## Verify on Etherscan

You'll need an `ETHERSCAN_API_KEY` environment variable. You can get one from the [Etherscan API site.](https://etherscan.io/apis)

```
npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
```
example:

```
npx hardhat verify --network kovan 0x9279791897f112a41FfDa267ff7DbBC46b96c296 "0x9326BFA02ADD2366b30bacB125260Af641031331"
```

### Linting

```
yarn lint:fix
```
