const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


router.post(
   '/register',
   [
     check('email', 'Некоректний email').isEmail(),
     check('password', 'Минимальная длина пароля 6 символв').isLength({min: 6})
   ],
   async (req, res) => {

     try {

       const errors = validationResult(req)

       if (!errors.isEmpty()) {
         return res.status(400).json({
           errors: errors.array(),
           message: 'Некоректные данные пр регистрации'
         })
       }

       const {email, password} = req.body
       const candidate = await User.findOne(email)

       if (candidate) {
         return res.status(400).json({message: 'Такой ползователь уже существует'})
       }

       const hashPassword = await bcrypt.hash(password, 12)
       const user = new User({email, password: hashPassword})

       await user.save()

       req.status(201).json({message: 'Пользователь создан'})

     } catch (e) {
       res.status(500).json({message: 'Внутренняя ошибка сервера'})
     }

   })

router.post(
   '/login',
   [
     check('email', 'Введите коректний email').normalizeEmail().isEmail(),
     check('password', 'Введите пароль').exists()
   ],
   async (req, res) => {
     try {

       const errors = validationResult(req)

       if (!errors.isEmpty()) {
         return res.status(400).json({
           errors: errors.array(),
           message: 'Некоректные данные при входе в систему'
         })
       }

       const {email, password} = req.body

       const user = await User.findOne({email})

       if (!user) {
         return res.status(400).json({message: 'Пользователь не найде'})
       }

       const isMatch = await bcrypt.compare(password, user.password)

       if (!isMatch) {
         return res.send(400).json({message: 'Неверный пароль'})
       }

       const token = jwt.sign(
          {userId: user.id},
          config.get('jwtSecret'),
          {expiresIn: '1h'}
       )

       res.json({token, userId: user.id})

     } catch (e) {
       res.status(500).json({message: 'Внутренняя ошибка сервера'})
     }

   })


module.exports = router