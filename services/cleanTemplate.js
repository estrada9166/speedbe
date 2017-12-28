'use strict'

const fs = require('fs-extra')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createAuth (dirPath) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await cleanTemplate(dirPath)
  } catch (err) {
    throw err
  }
}

async function cleanTemplate (dirPath) {
  try {
    const data = await fs.readFileSync(`${dirPath}/index.js`, 'utf8')
    const removeMiddleware = data.replace(/#authMiddleware/g, '')
    const removeTags = removeMiddleware.replace(/#(.)+/g, '')
    await fs.outputFileSync(`${dirPath}/index.js`, removeTags)
  } catch (err) {
    throw err
  }
}

module.exports = createAuth
