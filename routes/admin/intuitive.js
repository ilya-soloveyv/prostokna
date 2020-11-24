const { Router } = require('express')
const router = Router()

const IntuitiveType = require('../../models').intuitiveType
const IntuitiveQuestion = require('../../models').intuitiveQuestion
const IntuitiveAnswer = require('../../models').intuitiveAnswer
const IntuitiveProduct = require('../../models').intuitiveProduct

router.get('/list', async (req, res, next) => {
  const Product = require('../../models').product

  const response = {}
  response.types = await IntuitiveType.list()
  response.question = await IntuitiveQuestion.list()
  response.answer = await IntuitiveAnswer.list()
  response.products = await Product.list()
  response.answer_products = await IntuitiveProduct.list()
  res.json(response)
})

router.post('/getAnswerProducts', async (req, res, next) => {
  const response = {}
  const iIntuitiveAnswerID = req.body.iIntuitiveAnswerID
  const productsID = req.body.productsID

  await IntuitiveProduct.destroy({
    where: {
      iIntuitiveAnswerID
    }
  })

  const data = []
  productsID.forEach((iProductID) => {
    data.push({
      iIntuitiveAnswerID,
      iProductID
    })
  })
  await IntuitiveProduct.bulkCreate(data)
  console.log(data)

  response.answer_products = await IntuitiveProduct.list()
  res.json(response)
})

// router.post('/updateAnswerProducts', async (req, res, next) => {
//   const response = {}
//   response.answer_products = await IntuitiveProduct.list()
//   res.json(response)
// })

router.post('/getType', async (req, res, next) => {
  const response = await IntuitiveType.item(req.body.iIntuitiveTypeID)
  res.json(response)
})

router.post('/updateType', async (req, res, next) => {
  const response = await IntuitiveType.up(req.body.type)
  res.json(response)
})

router.post('/deleteType', async (req, res, next) => {
  const response = await IntuitiveType.delete(req.body.iIntuitiveTypeID)
  res.json(response)
})

router.post('/getQuestion', async (req, res, next) => {
  const response = await IntuitiveQuestion.item(req.body.iIntuitiveQuestionID)
  res.json(response)
})

router.post('/updateQuestion', async (req, res, next) => {
  const response = await IntuitiveQuestion.up(req.body.question)
  res.json(response)
})

router.post('/deleteQuestion', async (req, res, next) => {
  const response = await IntuitiveQuestion.delete(req.body.iIntuitiveQuestionID)
  res.json(response)
})

router.post('/getAnswer', async (req, res, next) => {
  const response = await IntuitiveAnswer.item(req.body.iIntuitiveAnswerID)
  res.json(response)
})

router.post('/updateAnswer', async (req, res, next) => {
  const response = await IntuitiveAnswer.up(req.body.answer)
  res.json(response)
})

router.post('/deleteAnswer', async (req, res, next) => {
  const response = await IntuitiveAnswer.delete(req.body.iIntuitiveAnswerID)
  res.json(response)
})

module.exports = router
