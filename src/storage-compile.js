const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const BUILD_FOLDER_PATH = path.resolve(__dirname, '../build')
const CONTRACT_FOLDER_PATH = path.resolve(__dirname, './contract/storage')

const clearBuildFolder = () => {
  fs.removeSync(BUILD_FOLDER_PATH)
  fs.mkdirSync(BUILD_FOLDER_PATH)
}

const createInput = () => {
  return {
    language: 'Solidity',
    sources: {
      'Storage.sol': {
        content: fs.readFileSync(path.resolve(__dirname, CONTRACT_FOLDER_PATH, 'Storage.sol'), 'utf8')
      },
      // 'SafeMath.sol': {
      //   content: fs.readFileSync(path.resolve(__dirname, CONTRACT_FOLDER_PATH, 'SafeMath.sol'), 'utf8')
      // },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  }
}

function findImports(dependency) {
  console.log('Searching for dependency: ', dependency)
  switch (dependency) {
    case 'SafeMath.sol':
      return { contents: fs.readFileSync(path.resolve(__dirname, CONTRACT_FOLDER_PATH, 'SafeMath.sol'), 'utf8') }
    default:
      return { error: 'File not found' }
  }
}

const compileInput = (config) => {
  try {
    return JSON.parse(solc.compile(
      JSON.stringify(config),
      { import: findImports },
    ))
  } catch (e) {
    console.log(e)
  }
}

const createOutput = (compiled) => {
  if (!compiled) {
    console.error('ERROR\nNO OUTPUT')
    return
  } else if (compiled.errors) {
    console.error('ERROR\n')
    compiled.errors.map(error => console.log(error.formattedMessage))
    return
  }
  for (let contractFileName in compiled.contracts) {
    const contractName = contractFileName.replace('.sol', '')
    console.log('Writing: ', contractName + '.json')
    fs.outputJsonSync(
      path.resolve(BUILD_FOLDER_PATH, contractName + '.json'),
      compiled.contracts[contractFileName][contractName],
      {
        spaces: 2,
      }
    )
  }
}

clearBuildFolder()
const config = createInput()
const compiled = compileInput(config)
createOutput(compiled)
