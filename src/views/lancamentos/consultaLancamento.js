import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LacamentosTable from './lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'
import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button';

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '', 
        mes: '', 
        tipo: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoDeletar: {},
        anoAtual: new Date()
    }
    
    constructor(){
        super();
        this.service = new LancamentoService();
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

        this.service.consultar(lancamentoFiltro)
        .then( res => {
            this.setState( { lancamentos: res.data } )
        }).catch( error => {
            console.log(error)
        } )
    }

    editarLancamento = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    deletarLancamento = () => {
        this.service.deletar(this.state.lancamentoDeletar.id).then(response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            lancamentos.splice(index, 1)
            this.setState({lancamentos : lancamentos, showConfirmDialog : false})

            messages.mensagemSucesso('Lançamento excluído com sucesso!')
        }).catch(error => {
            messages.mensagemErro('Erro ao tentar deletar o lançamento!')
        })
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog : true, lancamentoDeletar: lancamento })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, lancamentoDeletar: {} })

    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    alterarStatusLancamento = (lancamento, status) => {
        this.service.alterarStatusLancamento(lancamento.id, status)
        .then( response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(lancamento)

            if(index !== -1){ //Se objeto não for encontrado no array o index of retorna -1
                lancamento['status'] = status
                lancamentos[index] = lancamento
                this.setState({lancamento})
            }
            messages.mensagemSucesso("Status atualizado com sucesso!")
        })
    }

    render(){
        const listaMes = this.service.obterMeses()

        const listaTipos = this.service.obterTipos()

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletarLancamento} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        )

        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="number" 
                                className="form-control" 
                                id="inputAno"
                                value={this.state.ano}
                                onChange={e => this.setState({ano: e.target.value}) } 
                                placeholder="Insira o ano">
                            </input>

                        </FormGroup>

                        <FormGroup htmlFor="inputMes" label="Mês:">
                            <SelectMenu id="iptMes" 
                                className="form-control" 
                                value={this.state.mes}
                                onChange={e => this.setState({mes: e.target.value})}
                                lista={listaMes}>
                            </SelectMenu>
                        </FormGroup>

                        <FormGroup htmlFor="inputDesc" label="Descrição:">
                        <input type="text" 
                                className="form-control" 
                                id="inputDesc"
                                value={this.state.descricao}
                                onChange={e => this.setState({descricao: e.target.value})}
                                placeholder="Insira a descrição">
                            </input>
                        </FormGroup>

                        <FormGroup htmlFor="inputTipo" label="Tipo:">
                            <SelectMenu id="iptTipo" 
                            className="form-control" 
                            value={this.state.tipo}
                            onChange={e => this.setState({tipo: e.target.value})}
                            lista={listaTipos}>
                            </SelectMenu>
                        </FormGroup>

                        <button disabled={!this.state.ano} type="button" onClick={this.buscarLancamento} className="btn btn-success">Buscar</button>
                        <button type="button" className="btn btn-danger" onClick={this.preparaFormularioCadastro}>Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LacamentosTable lancamentos={this.state.lancamentos}
                                            deleteAction={this.abrirConfirmacao}
                                            editAction={this.editarLancamento}
                                            alterarStatusLancamento={this.alterarStatusLancamento} />
                        </div>
                    </div>
                </div>
                
                <div>
                <Dialog header="Confirmação" 
                    visible={this.state.showConfirmDialog} 
                    style={{width: '50vw'}} 
                    footer={confirmDialogFooter}
                    modal={true} 
                    onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão do lançamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)