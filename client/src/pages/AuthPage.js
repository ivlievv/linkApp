import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";


export const AuthPage = () => {

  const message = useMessage()

  const {loading, request, error, clearError} = useHttp()

  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]) // буду следить за ошибкой, со помощью error

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value}) // с помощью оператора ...form разварациваю все что касаеться form, дальше для того чтобы определить какое именно поле я меняю я обращаюсь к [-||-]: -||-
  }

  const registerHandler = async () => {
    try {
      const data = await request('api/auth/register', 'POST', {...form}) // получаю data которая прилетает с сервера и жду пока выполниться request с необходимыми параметрами ('api/auth/register', 'POST', {...form}) 1. url 'api/auth/register' - которую осуществили на бэке. 2. это метод. 3. передаем ту дату которую мы хотим передать на сервер, на сервер мы должны передавать имейл и пароль, по жтому разварачиваем ...form
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('api/auth/login', 'POST', {...form}) // получаю data которая прилетает с сервера и жду пока выполниться request с необходимыми параметрами ('api/auth/register', 'POST', {...form}) 1. url 'api/auth/register' - которую осуществили на бэке. 2. это метод. 3. передаем ту дату которую мы хотим передать на сервер, на сервер мы должны передавать имейл и пароль, по жтому разварачиваем ...form
      message(data.message)
    } catch (e) {}
  }


  return (
     <div className="row">
       <div className="col s6 offset-s3">
         <h1>Сократи ссылку</h1>
         <div className="card blue darken-1">
           <div className="card-content white-text">
             <span className="card-title">Авторизаия</span>
             <div>
               <div className="input-field">
                 <input
                    placeholder="Введите Email"
                    id="email"
                    type="text"
                    name="email" // и посл за счет того что на каждом input есть name то я буду менять либо имейл либо пароль с помошью метода change....
                    onChange={changeHandler}
                 />
                 <label htmlFor="email">Email</label>
               </div>
               <div className="input-field">
                 <input
                    placeholder="Введите парроль"
                    id="password"
                    type="password"
                    name="password"
                    onChange={changeHandler}
                 />
                 <label htmlFor="password">Пароль</label>
               </div>
             </div>
           </div>
           <div className="card-action">
             <span
                className="btn yellow darken-4"
                style={{marginRight: 10}}
                disabled={loading}
                onClick={loginHandler}
             >
               Войти
             </span>
             <span
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disabled={loading} // блокируем кнопки когда loading
             >
               Регистрация
             </span>
           </div>
         </div>
       </div>
     </div>
  )
}