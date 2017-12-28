'use strict'

const path = require('path')
const fs = require('fs-extra')
const { spawnSync } = require('child_process')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createEnvVariables (dirPath) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await installDotenv(dirPath)
    await createDotenvFile(dirPath)
    await importFile(dirPath)
  } catch (err) {
    throw err
  }
}

function installDotenv (dirPath) {
  new Promise(resolve => {
    resolve(spawnSync('sh', [`${path.join(__dirname, '..', 'scripts', 'installDotenv.sh')}`], {
      cwd: dirPath
    }))
  })
}

async function createDotenvFile (dirPath) {
  try {
    const port = 'PORT=5000\nJWTKEY=YOUR_JWT_KEY\n'
    await fs.outputFileSync(`${dirPath}/variables.env`, port)
  } catch (err) {
    throw err
  }
}

async function importFile (dirPath) {
  try {
    const data = await fs.readFileSync(`${dirPath}/index.js`, 'utf8')
    const result = data.replace(/^#dotenv$/gm, "require('dotenv').config({ path: 'variables.env' })")
    await fs.outputFileSync(`${dirPath}/index.js`, result)
  } catch (err) {
    throw err
  }
}

module.exports = createEnvVariables
