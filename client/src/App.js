import React from 'react';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css';

function App () {
  const {token, login, userId, logout} = useAuth()
  const routes = useRoutes(false)
  return (
     <Router>
       <div className="container">
         {routes}
       </div>
     </Router>

  );
}

export default App;
