import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'
import * as messages from '../../components/toastr'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: null,
        ano: '',
        tipo: null,
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super()
        this.service =  new LancamentoService()
    }

    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
                .then( response => {
                    this.setState( {...response.data, atualizando: true} ) //O operador '...' espara as propriedades do .data. Funciona pois o método do backend retorna as mesmas propriedades do setState.
                } ).catch( erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
        console.log(params.id)
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const { descricao, valor, ano } = this.state
        const mes = this.state.mes
        const tipo = this.state.tipo

        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id }

        try{
            this.service.validar(lancamento)
        }catch(erro){
            const mensagemErro = erro.mensagens;
            mensagemErro.forEach(msg => messages.mensagemErro(msg));
            return false;    
        }

        this.service.salvar(lancamento).then( response => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('Lançamentos salvo com sucesso!')
        }).catch( error => {
            messages.mensagemErro(error.response.data)
        })

        console.log(lancamento, this.state.mes, tipo)
    }

    atualizar = () => {
        const { descricao, valor, ano, mes, tipo, status, usuario, id } = this.state
        
        const lancamento = { descricao, valor, mes, ano, tipo, status, usuario, id }

        this.service.atualizar(lancamento).then( response => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('Lançamentos atualizado com sucesso!')
        }).catch( error => {
            messages.mensagemErro(error.response.data)
        })

    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }

    handleChangeSelect = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }

    render(){

        const tipos = this.service.obterTipos()
        const meses = this.service.obterMeses()

        return(
            <Card title={this.state.atualizando ? 'Atualização de lançamentos' : 'Cadastro de lançamentos'}>
                <div>
                    <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descrição: *">
                        <input id="inputDescricao" 
                            type="text" 
                            className="form-control" 
                            name="descricao"
                            value={this.state.descricao}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="iptAno" label="Ano: *"> 
                            <input id="iptAno" 
                                    name="ano"
                                    type="number" 
                                    className="form-control"
                                    value={this.state.ano}
                                    onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="selectMes" label="Mês: *"> 
                            <SelectMenu id="selectMes" 
                                        name="mes" 
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        lista={meses} 
                                        className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="iptValor" label="Valor: *">
                            <input id="iptValor" 
                                    type="number" 
                                    name="valor"
                                    value={this.state.valor}
                                    onChange={this.handleChange}
                                    className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="selectTipo" label="Tipo: *">
                            <SelectMenu id="selectTipos"                                         
                                        value={this.state.tipo}
                                        name="tipo"
                                        onChange={this.handleChange}
                                        lista={tipos} 
                                        className="form-control"/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="selectStatus" label="Status:">
                            <input  type="text" 
                                    value={this.state.status}
                                    name="status"
                                    className="form-control" 
                                    disabled={true} />
                        </FormGroup>
                    </div>
                </div>
            
            <div className="row">
                <div className="col-md-6">
                    {this.state.atualizando ?
                    (
                        <button onClick={this.atualizar} className="btn btn-primary">Atualizar</button>
                    ) : (
                        <button onClick={this.submit} className="btn btn-success">Salvar</button>
                    )
                    }             
                    <button onClick={ e => this.props.history.push('/consulta-lancamentos') } className="btn btn-danger">Cancelar</button>
                </div>
            </div>
                
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)