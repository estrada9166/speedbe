'use strict'

const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const { spawnSync } = require('child_process')
const templatesPath = path.join(__dirname, '..', 'templates')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 * @param  {Boolean} hasAuth if the user choose to have authentication
 */
async function createUploadImage (dirPath, hasAuth) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await installAWSSdk(dirPath)
    await appendEnvVariables(dirPath)
    await createFile(dirPath)
    await addRoute(dirPath, hasAuth)
  } catch (err) {
    throw err
  }
}

function installAWSSdk (dirPath) {
  new Promise(resolve => {
    resolve(spawnSync('sh', [`${path.join(__dirname, '..', 'scripts', 'installAWSSdk.sh')}`], {
      cwd: dirPath
    }))
  })
}

async function appendEnvVariables (dirPath) {
  const data = 'AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY\nAWS_SECRET=YOUR_AWS_SECRET\n'
  await fs.appendFileSync(`${dirPath}/variables.env`, data)
}

async function createFile (dirPath) {
  await fse.copySync(`${templatesPath}/starterFileUploadImage.txt`, `${dirPath}/routes/uploadFile.js`)
}

async function addRoute (dirPath, hasAuth) {
  const data = await fse.readFileSync(`${dirPath}/index.js`, 'utf8')
  const requireAuth = data.replace(/^#image$/gm, "const image = require('./routes/uploadFile')")
  let route
  if (hasAuth) {
    route = requireAuth.replace(/#imageRoute/g, "app.post('/image', jwt({secret: process.env.JWTKEY}), image.uploadImage)")
  } else {
    route = requireAuth.replace(/#imageRoute/g, "app.post('/image', image.uploadImage)")
  }
  await fse.outputFileSync(`${dirPath}/index.js`, route)
}

module.exports = createUploadImage
