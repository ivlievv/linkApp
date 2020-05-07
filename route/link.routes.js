const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.post('/generate', async (req, res) => { // он обрабатывает ссылку '/generate' которая будет мне генерировать сокращенную ссылку
  try {

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/', async (req, res) => {    // для получения всеъ ссылок
  try {

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/:id', async (req, res) => {    // для получения ссылки по id
  try {

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

module.exports = router


/*
* даный роут отвечает за генерацию
* сслок которые я буду сокращать в приложении*/