'use strict'

const path = require('path')
const fs = require('fs-extra')
const { spawnSync } = require('child_process')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createDeployWithNow (dirPath) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await installNow(dirPath)
    await createNowEnvVariables(dirPath)
    await replaceEnvVariables(dirPath)
    await editPackageJson(dirPath)
    await appendGitIgnore(dirPath)
  } catch (err) {
    throw err
  }
}

/**
 * creates an example file of varibale.env that will be track by git and serve as example of env needed
 * @param  {String} dirName the name of the project and dirname
 */
async function createNowEnvVariables (dirPath) {
  await fs.copySync(`${dirPath}/variables.env`, `${dirPath}/variables.env.now`)
}

function installNow (dirPath) {
  return new Promise(resolve => {
    resolve(spawnSync('sh', [`${path.join(__dirname, '..', 'scripts', 'installNow.sh')}`], {
      cwd: dirPath
    }))
  })
}

async function replaceEnvVariables (dirPath) {
  const readData = await fs.readFileSync(`${dirPath}/variables.env.now`, 'utf8')
  const editPort = readData.replace('5000', '80')
  const editEnv = editPort.replace('development', 'production')
  await fs.outputFileSync(`${dirPath}/variables.env.now`, editEnv)
}

async function editPackageJson (dirPath) {
  const data = await fs.readFileSync(`${dirPath}/package.json`, 'utf8').toString().split('\n')
  const mainPosition = data.indexOf('  "main": "index.js",')
  data.splice(mainPosition + 1, 0, '  "now": {\n    "dotenv": "variables.env.now"\n  },')
  const scriptPosition = data.indexOf('  "scripts": {')
  data.splice(scriptPosition + 1, 0, '    "start": "node ./index.js",')
  const text = data.join('\n')
  await fs.outputFileSync(`${dirPath}/package.json`, text)
}

async function appendGitIgnore (dirPath) {
  const data = '/variables.env.now\n'
  await fs.appendFileSync(`${dirPath}/.gitignore`, data)
}

module.exports = createDeployWithNow
