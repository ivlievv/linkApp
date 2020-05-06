const {Router} = require('express')
const router = Router()


router.post('/register', async (req, res) => {
    
    try {

    } catch (e) {
      res.status(500).json({message: 'Внутренняя ошибка сервера'})
    }
    
})

router.post('/login', async (req, res) => {

})


module.exports = router