'use strict'

const path = require('path')
const fs = require('fs-extra')
const { spawnSync } = require('child_process')
const templatesPath = path.join(__dirname, '..', 'templates')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createMongooseIntegration (dirPath) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await installMongoose(dirPath)
    await appendMongooseDb(dirPath)
    await createFile(dirPath)
    await addRoutes(dirPath)
  } catch (err) {
    throw err
  }
}

function installMongoose (dirPath) {
  return new Promise(resolve => {
    resolve(spawnSync('sh', [`${path.join(__dirname, '..', 'scripts', 'installMongoose.sh')}`], {
      cwd: dirPath
    }))
  })
}

async function appendMongooseDb (dirPath) {
  const data = 'DATABASE=ADD_YOUR_MONGODB_URL\nMONGOOSE_ENCRYPT_KEY=ADD_YOUR_MONGOOSE_ENCRYPTION_KEY\n'
  await fs.appendFileSync(`${dirPath}/variables.env`, data)
}

async function createFile (dirPath) {
  await fs.copySync(`${templatesPath}/starterFileModel.txt`, `${dirPath}/models/Example.js`)
}

async function addRoutes (dirPath) {
  const data = await fs.readFileSync(`${dirPath}/index.js`, 'utf8')
  const requireMongoose = data.replace(/^#mongoose$/gm, "const mongoose = require('mongoose')")
  const connectMongoose = requireMongoose.replace(/^#connectMongoose$/gm, "mongoose.connect(process.env.DATABASE)\nmongoose.connection.on('error', (err) => {\n  console.log(err.message)\n})\nrequire('./models/Example')")
  await fs.outputFileSync(`${dirPath}/index.js`, connectMongoose)
}

module.exports = createMongooseIntegration
