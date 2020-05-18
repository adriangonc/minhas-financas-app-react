import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: ''
    }

    constructor(){
        super()
        this.service =  new LancamentoService()
    }

    submit = () => {
        console.log(this.state)
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }

    render(){

        const tipos = this.service.obterTipos()
        const meses = this.service.obterMeses()

        return(
            <Card title="Cadastro de lançamentos">
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
                                        value={this.state.mes}
                                        name="mes"
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
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        lista={tipos} 
                                        className="form-control"/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="selectStatus" label="Status:">
                            <input  type="text" 
                                    name="status"
                                    value={this.state.status}
                                    className="form-control" 
                                    disabled={true} />
                        </FormGroup>
                    </div>
                </div>
            
            <div className="row">
                <div className="col-md-6">
                    <button onClick={this.submit} className="btn btn-success">Salvar</button>
                    <button className="btn btn-danger">Cancelar</button>
                </div>
            </div>
                
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)