'use strict'

const path = require('path')
const fs = require('fs-extra')
const { spawnSync } = require('child_process')
const templatesPath = path.join(__dirname, '..', 'templates')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createAuth (dirPath) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await installJWT(dirPath)
    await addMiddlewareRoute(dirPath)
    await appendEnvVariables(dirPath)
    await addAuthTokenEndPoint(dirPath)
  } catch (err) {
    throw err
  }
}

function installJWT (dirPath) {
  return new Promise(resolve => {
    resolve(spawnSync('sh', [`${path.join(__dirname, '..', 'scripts', 'installJWT.sh')}`], {
      cwd: dirPath
    }))
  })
}

async function addMiddlewareRoute (dirPath) {
  const data = await fs.readFileSync(`${dirPath}/index.js`, 'utf8')
  const requireAuth = data.replace(/^#auth$/gm, "const jwt = require('express-jwt')")
  const replaceMiddleware = requireAuth.replace(/#authMiddleware/g, ' jwt({secret: process.env.JWTKEY}),')
  await fs.outputFileSync(`${dirPath}/index.js`, replaceMiddleware)
}

async function appendEnvVariables (dirPath) {
  const data = 'JWTKEY=YOUR_JWT_KEY\n'
  await fs.appendFileSync(`${dirPath}/variables.env`, data)
}

async function addAuthTokenEndPoint (dirPath) {
  const data = await fs.readFileSync(`${dirPath}/index.js`, 'utf8')
  const requireAuth = data.replace(/^#token$/gm, "const token = require('./routes/token')")
  const addNewRoute = requireAuth.replace(/#tokenRoute/g, "app.post('/token', token.newToken)")
  await fs.outputFileSync(`${dirPath}/index.js`, addNewRoute)
  await fs.copySync(`${templatesPath}/starterFileAuth.txt`, `${dirPath}/routes/token.js`)
}

module.exports = createAuth
