'use strinct'

const getExample = (req, res) => {
  res.json('This is a /GET example')
}

const newExample = (req, res) => {
  const test = req.body.test

  res.json(`This is a /POST example, you just post ${test}`)
}

const updateExample = (req, res) => {
  const test = req.body.test

  res.json(`This is a /PUT example, you just put ${test}`)
}

const deleteExample = (req, res) => {
  const test = req.body.test

  res.json(`This is a /DELETE example, you just deleted ${test}`)
}

module.exports = { getExample, newExample, updateExample, deleteExample }
