import React from 'react';

import '../custom.css'
import Rotas from './rotas'
import Navbar from '../components/navbar'


import 'bootswatch/dist/flatly/bootstrap.css'

class App extends React.Component {

  render(){
    return(
      <>
        <Navbar></Navbar>
        <div className="container">
          <Rotas></Rotas>
        </div>
      </>
    )
  }

}


export default App;
