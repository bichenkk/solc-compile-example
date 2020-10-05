const Web3 = require('web3')
const _ = require('lodash')

const web3 = new Web3()

const createAccount = async () => {
  const account = await web3.eth.accounts.create()
  console.log('New Ethereum Account Created')
  // console.log('account', account)
  console.log('ACCOUNT ADDRESS:', _.get(account, 'address'))
  console.log('ACCOUNT PRIVATE KEY:', _.get(account, 'privateKey').substring(2))
}

createAccount()
