const inquirer = require('inquirer')
const ora = require('ora')

const spinner = ora('Creating the project')

const createPackage = require('../services/createPackage')
const createStarterFiles = require('../services/createStarterFiles')
const createAuth = require('../services/createAuth')
const { createEnvVariables, createExampleEnvVariables } = require('../services/createEnvVariables')
const createUploadImage = require('../services/createUploadImage')
const createDeployWithNow = require('../services/createDeployWithNow')
const cleanTemplate = require('../services/cleanTemplate')

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name of the project',
    validate: (name) => typeof name === 'string'
  },
  {
    type: 'confirm',
    name: 'auth',
    message: 'Has authentication'
  },
  {
    type: 'confirm',
    name: 'uploadFiles',
    message: 'Want to upload files'
  },
  {
    type: 'confirm',
    name: 'now',
    message: 'Want to deploy with now'
  }
]

function createProject () {
  inquirer.prompt(questions).then(answers => handleResponse(answers))
}

async function handleResponse (answers) {
  try {
    spinner.start()
    const folderPath = await createPackage(answers['name'])
    await createStarterFiles(folderPath)
    await createEnvVariables(folderPath)

    if (answers['auth']) {
      await createAuth(folderPath)
    }
    if (answers['uploadFiles']) {
      await createUploadImage(folderPath, answers['auth'])
    }
    if (answers['now']) {
      await createDeployWithNow(folderPath)
    }
    await cleanTemplate(folderPath)
    await createExampleEnvVariables(folderPath)
    spinner.stop()
    console.log('Ready to hack!')
  } catch (err) {
    console.log(err)
  }
}

module.exports = createProject
