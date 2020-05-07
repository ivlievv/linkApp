import React, {useState} from "react";


export const AuthPage = () => {

  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event =>{
    setForm({...form,[event.target.name]: event.target.value}) // с помощью оператора ...form разварациваю все что касаеться form, дальше для того чтобы определить какое именно поле я меняю я обращаюсь к [-||-]: -||-
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
             <span className="btn yellow darken-4" style={{marginRight: 10}}>Войти</span>
             <span className="btn grey lighten-1 black-text">Регистрация</span>
           </div>
         </div>
       </div>
     </div>
  )
}