const { Router } = require('express')
const router = Router()

const IntuitiveQuestion = require('../../models').intuitiveQuestion
const IntuitiveAnswer = require('../../models').intuitiveAnswer

router.get('/list', async (req, res, next) => {
  const response = {}
  res.json(response)
})

router.get('/structure', async (req, res, next) => {
  const response = await IntuitiveQuestion.structureList()
  res.json(response)
})

module.exports = router
