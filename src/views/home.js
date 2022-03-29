import React from 'react'
import UsuarioService from '../app/service/usuarioService'
//import LocalStorageService from '../app/service/localstorageService' 
import { AuthContext } from '../main/provedorAutenticacao'

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.usuarioService = new UsuarioService()
    }

    componentDidMount(){
        //const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const usuarioLogado = this.context.usuarioAutenticado
        console.log('Usuario do localstorage: ' + usuarioLogado)

        this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
            .then( response => {
                this.setState({ saldo: response.data })
            } ).catch( error => {
                console.log(error.response)
            })
    }

    render(){
        return(
            <div className="jumbotron">
            <h1 className="display-3">Bem vindo!</h1>
            <p className="lead">Esse é seu sistema de finanças.</p>
        <div className="row">
            <div className="col-md-auto">
                <p className="lead">Seu saldo para o mês atual é de:</p>
            </div>
            <div className="col-md-auto">
                <h2 className={ this.state.saldo > 0 ? "text-success" : "text-danger"}> R$ {this.state.saldo} </h2>
            </div>
        </div>
            <hr className="my-4" />
            <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button">
                    <i className="pi pi-users"></i>  Cadastrar Usuário
                </a>
                <a className="btn btn-success btn-lg" href="#/cadastro-lancamentos" role="button">
                    <i className="pi pi-money-bill"></i>  Cadastrar Lançamento
                </a>
                <a className="btn btn-info btn-lg" href="#/consulta-lancamentos" role="button">
                    <i className="pi pi-search"></i>  Consultar Lançamento
                </a>
            </p>
        </div>
        )
    }
}

Home.contextType = AuthContext

export default Home