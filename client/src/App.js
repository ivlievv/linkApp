import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import 'materialize-css';
import {NavBar} from "./components/Navbar";

function App () {
  const {token, login, logout, userId } = useAuth() // теперь жно передавать эти данные {token, login, userId, logout} через контекст всему нашему приложению
  const isAuthenticated = !!token // это говорит о том зарегистрирован сейчас пользователь или нет, а это опредиляется по аличию токена, !!- значит что я его привожу к bool
  const routes = useRoutes(isAuthenticated)
  return (
     <AuthContext.Provider value={{ // см. коментарии в ./context/AuthContext
       token, login, logout, userId, isAuthenticated
     }
     }>
       <Router>
         {isAuthenticated && <NavBar/>}
         <div className="container">
           {routes}
         </div>
       </Router>
     </AuthContext.Provider>
  );
}

export default App;
