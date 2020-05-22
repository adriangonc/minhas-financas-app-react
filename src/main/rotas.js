import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consultaLancamento'
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />

            </Switch>
        </HashRouter>
    )
}

export default Rotas