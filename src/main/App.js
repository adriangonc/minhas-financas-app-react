import React from 'react';

import '../custom.css'
import Rotas from './rotas'
import Navbar from '../components/navbar'
import ProvedorAutenticacao from './provedorAutenticacao'

import 'toastr/build/toastr.min.js'

import 'toastr/build/toastr.css'
import 'bootswatch/dist/flatly/bootstrap.css'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {

  render() {

    return (
      <ProvedorAutenticacao>
        <Navbar />
        <div>
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}
export default App;
