'use strict'

const path = require('path')
const fs = require('fs-extra')
const templatesPath = path.join(__dirname, '..', 'templates')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createStarterFiles (dirPath) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await createIndexFile(dirPath)
    await createRoutesFile(dirPath)
    await createGitIgnoreFile(dirPath)
  } catch (err) {
    throw err
  }
}

async function createIndexFile (dirPath) {
  try {
    await fs.copySync(`${templatesPath}/starterFileIndex.txt`, `${dirPath}/index.js`)
  } catch (err) {
    throw err
  }
}

async function createRoutesFile (dirPath) {
  try {
    await fs.ensureDirSync(dirPath)
    await fs.copySync(`${templatesPath}/starterFileRoutes.txt`, `${dirPath}/routes/example.js`)
  } catch (err) {
    throw err
  }
}

async function createGitIgnoreFile (dirPath) {
  try {
    await fs.ensureDirSync(dirPath)
    await fs.copySync(`${templatesPath}/starterFileGitignore.txt`, `${dirPath}/.gitignore`)
  } catch (err) {
    throw err
  }
}

module.exports = createStarterFiles
