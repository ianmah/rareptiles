# Getting Started 

## Setup

- Install [Ganache](https://www.trufflesuite.com/ganache)
- Use "quickstart" mode
- Install [Metamask extension](https://metamask.io/download.html)
- Create a new wallet
- Add a new network by clicking "Ethereum Mainnet" > "Custom RPC"
- Network name: `localganache`, New RPC Url: `<RPC SERVER in Ganache>` probably `HTTP://127.0.0.1:7545`, Chain ID: `1337`
- Run `truffle compile` to compile the contracts
- Run `truffle migrate` to deploy the contracts to your local ethereum network
- `yarn start` and connect wallet :money_with_wings:

## Available Scripts

In the project directory, you can run:
### `yarn` 

Instal dependencies

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Do we even have tests?
