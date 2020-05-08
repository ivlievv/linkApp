const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: {type: String, required: true},   // от куда идет даная ссылка
  to: {type: String, required: true, unique: true},  // куда будет вести данная ссылка
  code: {type: String, required: true, unique: true}, // код, т.к. с ним взаемодействуем
  date: {type: Date, default: Date.now},  // когда данная ссыка была создана
  click: {type:Number, default: 0}, // количество кликов по определленной ссылке (будут вестись счет переходов по определленой ссылке)
  owner: {type: Types.ObjectId, ref: 'User'}   // связываю ссылку с тем пользывателем что ее создал,  ref: 'User' указываю до колекции пользывателя
})

module.exports = model('Link', schema)