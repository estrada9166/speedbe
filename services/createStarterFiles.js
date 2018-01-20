'use strict'

const path = require('path')
const fs = require('fs-extra')
const templatesPath = path.join(__dirname, '..', 'templates')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createStarterFiles (dirPath, hasDB) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await createIndexFile(dirPath)
    await createRoutesFile(dirPath, hasDB)
    await createGitIgnoreFile(dirPath)
    await editPackageJson(dirPath)
  } catch (err) {
    throw err
  }
}

async function createIndexFile (dirPath) {
  await fs.copySync(`${templatesPath}/starterFileIndex.txt`, `${dirPath}/index.js`)
}

async function createRoutesFile (dirPath, hasDB) {
  let routes
  if (hasDB) {
    routes = `${templatesPath}/starterFileRouteWithMongoose.txt`
  } else {
    routes = `${templatesPath}/starterFileRoutes.txt`
  }
  await fs.ensureDirSync(dirPath)
  await fs.copySync(routes, `${dirPath}/routes/example.js`)
}

async function createGitIgnoreFile (dirPath) {
  await fs.ensureDirSync(dirPath)
  await fs.copySync(`${templatesPath}/starterFileGitignore.txt`, `${dirPath}/.gitignore`)
}

async function editPackageJson (dirPath) {
  const data = await fs.readFileSync(`${dirPath}/package.json`, 'utf8').toString().split('\n')
  const scriptPosition = data.indexOf('  "scripts": {')
  data.splice(scriptPosition + 1, 0, '    "standard": "standard",\n    "standard-fix": "standard --fix",')
  const text = data.join('\n')
  await fs.outputFileSync(`${dirPath}/package.json`, text)
}

module.exports = createStarterFiles
