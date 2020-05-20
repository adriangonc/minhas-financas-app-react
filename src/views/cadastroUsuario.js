import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import {mensagemSucesso, mensagemErro} from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome : '',
        email : '',
        senha : '',
        senhaRepeticao : ''
    }

    constructor(){
        super()
        this.service = new UsuarioService();
    }

    validar(){
        const mensagens = []

        if(!this.state.nome){
            mensagens.push('O campo Nome é obrigatório!')
        }

        if(!this.state.email){
            mensagens.push('O E-mail de cadastro e obrigatório!')
        } else if( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            mensagens.push('Informe um e-mail válido!')
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            mensagens.push('Digite a mesma senha duas vezez!')
        } else if(this.state.senha !== this.state.senhaRepeticao){
            mensagens.push('As senhas digitadas não são iguais!')
        }

        return mensagens
    }

    cadastrar = () => {
        const mensagens = this.validar();

        if(mensagens.length > 0){
            mensagens.forEach( (msg, index) => {
                mensagemErro(msg)
            } );
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvarUsuario(usuario).then( response => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça login para entrar!')
            this.props.history.push('/login')
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    cancelarLogin = () => {
        this.props.history.push('/login')
    }

    render(){
        return(
        <Card title="Cadastro de usuário">
        <div className="row">
            <div className="col-lg-12">
                <div className="bs-component">
                <FormGroup label="Nome: *" htmlFor="inputNome">
                    <input type="text" 
                           id="inputNome" 
                           className="form-control"
                           name="nome" 
                           onChange={e => this.setState({nome : e.target.value})}/>
                </FormGroup>
                
                <FormGroup label="Email: *" htmlFor="inputEmail">
                    <input type="text" 
                           id="inputEmail"
                           className="form-control" 
                           name="email" 
                           onChange={e => this.setState({email : e.target.value})}/>
                </FormGroup>

                <FormGroup label="Senha: *" htmlFor="inputSenha">
                    <input type="password" 
                           id="inputSenha"
                           className="form-control" 
                           name="senha" 
                           onChange={e => this.setState({senha : e.target.value})}/>
                </FormGroup>

                <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                    <input type="password" 
                           id="inputRepitaSenha"
                           className="form-control" 
                           name="senhaRepeticao" 
                           onChange={e => this.setState({senhaRepeticao : e.target.value})}/>
                </FormGroup>

                    <button type="button" onClick={this.cadastrar} className="btn btn-success">
                        Salvar
                    </button>
                    <button type="button" onClick={this.cancelarLogin} className="btn btn-danger">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
        </Card>
        )
    }
}

export default withRouter( CadastroUsuario )