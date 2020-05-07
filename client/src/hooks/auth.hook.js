import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData'

export const useAuth = () => { // в этой функции я экспортирую различние методы позволяющие пользователю зайти в систему либо выйти с неё

  const {token, setToken} = useState(null)
  const {userId, setUserId} = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
      userId, token
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
    // чистим эти значения
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)) // получаю потенциальные данные из localStorage, а для того чтобы привести это все к объекту вызываю JSON.parse

    if (data && data.token){ // если дата не null и в ней есть поле token то тогда вызыва функ. login(-||-)
      login(data.token, data.userId)
    }
  }, [login]) // как зависимоть дя даного useEffect указываю метод [login] потому что я его здесь исользую, и именно для этого я и оборачивал login в useCallback

  return {login, logout, token, userId}
}

/*
* как взаемодействовать с авторизайией если работаешь с jwt токеном?
* если мы получаем токин то нам необходимо
* его хранить в localStorage, тоисть если
* я перезагружу систему и в localStorage
* есть валидный токен то тогда я его просто
* исп. и сразу же перебрасываю пользователя
* в систему
* */

/*
* Этот хук отвечает за фвторизацию на фроте.
*  Это будет модуль который работает исключительно
*  с автризацией пользователя в систему */


/*
* когда приложение загружается хук useEffect
* будет смотреть есть ли вообще данные в
* localStorage, если они есть то чтобы он
* сам записал их с localStorage в локальное
* состояние
* */