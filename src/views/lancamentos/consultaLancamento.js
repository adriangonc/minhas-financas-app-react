import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LacamentosTable from './lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'
import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '', 
        mes: '', 
        tipo: '',
        descricao: '',
        lancamentos: []
    }
    
    constructor(){
        super();
        this.service = new LancamentoService();
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

    render(){
        const listaMes = this.service.obterMeses()

        const listaTipos = this.service.obterTipos()

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
                        <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LacamentosTable lancamentos={this.state.lancamentos}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)