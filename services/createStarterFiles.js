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
  await fs.copySync(`${templatesPath}/starterFileIndex.txt`, `${dirPath}/index.js`)
}

async function createRoutesFile (dirPath) {
  await fs.ensureDirSync(dirPath)
  await fs.copySync(`${templatesPath}/starterFileRoutes.txt`, `${dirPath}/routes/example.js`)
}

async function createGitIgnoreFile (dirPath) {
  await fs.ensureDirSync(dirPath)
  await fs.copySync(`${templatesPath}/starterFileGitignore.txt`, `${dirPath}/.gitignore`)
}

module.exports = createStarterFiles
