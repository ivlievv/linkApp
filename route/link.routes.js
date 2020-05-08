const {Router} = require('express')
const config = require('config')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const shortId = require('shortid')
const router = Router()

router.post('/generate', auth, async (req, res) => { // он обрабатывает ссылку '/generate' которая будет мне генерировать сокращенную ссылку
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body // с фронтенда получаю объект from, тоись тот путь от куда я делпюю вообще данную ссылку, в последствии нужно будет редеректнуть пользывателя по даному пути
    // код ниже позволит ссылке быть короче, для этого исп библеотеку shortId

    const code = shortId.generate() // с помощю generate я получаю тот самый уникальный код
    // далие я проверяю есть ли у меня уже в базе такая ссылка from
    // для этого ...
    const existing = await Link.findOne({from}) // если такая ссылка уже есть это значит что все данные по ней уже сформированы и нет смысла их формировать заново, по этому

    if (!existing && existing) { // если в ней что-то есть то ее просто оправляем
      return res.json({link: existing})
    }

    // далие формирую ту ссылку которая будет сокращенной и которая будет работать в моем сервисе

    const to = baseUrl + '/t/' + code

    // создаю новый объект ссылки

    const link = new Link({
      code, to, from, owner: req.user.userId // для того чтобы был доступен данный формат  owner:req.user.userId, добывляем middleware auth
    })

    await link.save()

    res.status(201).json({link})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/', auth, async (req, res) => {    // для получения всеъ ссылок
  try {                      // теперь благодаря auth иы можем определить какие ссылки к какому пользывателю относятся
    const links = await Link.find({owner: req.user.userId}) // для получения весех ссылок, получаю объект Link и жду пока модель Линк мне найдет все ссылки которые относятся к текушему пользывателю, как узнать какой пользыватель авторизировался? см. коментарии в middleware
    res.json(links) // в json возвращаю Линкс
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/:id', auth, async (req, res) => {    // для получения ссылки по id
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

module.exports = router


/*
* даный роут отвечает за генерацию
* сслок которые я буду сокращать в приложении*/