import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import NotificacoesTable from '../notificacoes/notificacoesTable'
import LocalStorageService from '../../app/service/localstorageService'
import * as messages from '../../components/toastr'
import OrdenarValores from '../../components/ordenarValores'

import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button';
import NotificacaoService from '../../app/service/notificacaoService'

class ConsultaNotificacoes extends React.Component{

    state = {
        ano: '', 
        mes: '', 
        tipo: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoDeletar: {},
        anoAtual: new Date(),
        notificacoes: []
    }
    
    constructor(){
        super();
        this.service = new NotificacaoService();
        this.state.ano = this.state.anoAtual.getFullYear();
        this.buscarLancamento();
    }

    buscarLancamento = () => {
        if(!this.state.ano){
            messages.mensagemErro('Você deve inserir um ano para buscar!')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.getNotificacoes()
        .then( res => {
            const lista = res.data

            if(lista.length === 0){
                messages.mensagemAlerta("Nenhum resultado encontrado!")
            }
            this.setState( { notificacoes: lista.sort() } )
        }).catch( error => {
            console.log(error)
        } )

    }

    render(){
        
        return(
            <Card title="Consulta de Notificações">
                
                <div className="row">
                    <div className="col-md-12" >
                        <div className="bs-component">
                            
                            <NotificacoesTable notificacoes={this.state.notificacoes} />
                            
                        </div>
                    </div>
                </div>
                
                
            </Card>
        )
    }
}

export default withRouter(ConsultaNotificacoes)