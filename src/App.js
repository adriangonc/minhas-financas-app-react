import React from 'react';
import Login from './views/login'
import CadastroUsuario from './views/cadastroUsuario'
import './custom.css'

import 'bootswatch/dist/flatly/bootstrap.css'

class App extends React.Component {

  render(){
    return(
      <div>
        {/* <Login/> */}
        <CadastroUsuario />
      </div>
    )
  }

}


export default App;
