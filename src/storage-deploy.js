// read .env variables
require('dotenv').config()

const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')
const storageContractJSON = require('../build/Storage.json')

const {
  DEPLOYER_ACCOUNT_ADDRESS,
  DEPLOYER_ACCOUNT_PRIVATE_KEY,
  INFURA_PROJECT_ID,
  // INFURA_PROJECT_SECRET,
} = process.env

const INFURA_ENDPOINT_HTTPS = `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`

const web3Provider = new HDWalletProvider([DEPLOYER_ACCOUNT_PRIVATE_KEY], INFURA_ENDPOINT_HTTPS)

const deploy = async () => {
  const web3 = new Web3(web3Provider)
  await web3.eth.net.isListening()
  console.log('Web3 is connected.')

  const accounts = await web3.eth.getAccounts()
  console.log(`accounts: ${JSON.stringify(accounts)}`)

  const storageContractAbi = storageContractJSON.abi
  const storageContractBytecode = storageContractJSON.evm.bytecode.object

  const storageContractToDeploy = new web3.eth.Contract(storageContractAbi)
  const storageContractInstance = await storageContractToDeploy
    .deploy({
      data: storageContractBytecode,
    })
    .send({
      from: accounts[0],
      gas: web3.utils.toHex(800000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
    })
    .on('error', (error) => {
      console.log('error', error)
    })
    .once('transactionHash', (transactionHash) => {
      console.log('transactionHash', transactionHash)
    })
    .once('receipt', (receipt) => {
      console.log('receipt', receipt)
    })
    // // .on('confirmation',  (confirmationNumber, receipt) => {})
  console.log('storageContractInstance', !!storageContractInstance)
}

deploy()