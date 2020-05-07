import {createContext} from 'react'

function fun () {}

export const AuthContext = createContext ({
  token: null,
  userId: null,
  login: fun,
  logout: fun,
  isAuthenticated: false
})

/*
* этот контекст сможет передавать
* параметры с использыванием
* конекста по всему приложению,
* для этого в app.js нужно обернуть
* все приложение в AuthContext,
* но он не можит быть просто контекстом
* а должен быть провайдеро по этому
* AuthContext.Provider и в качестве
* значения value я предаю эти значения
*  {token, login, userId, logout} */