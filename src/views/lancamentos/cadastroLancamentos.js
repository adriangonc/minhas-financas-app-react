import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'

class CadastroLancamentos extends React.Component {

    constructor(){
        super()
        this.service =  new LancamentoService()
    }

    render(){

        const tipos = this.service.obterTipos()
        const meses = this.service.obterMeses()

        return(
            <Card title="Cadastro de lançamentos">
                <div>
                    <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descrição: *">
                        <input id="inputDescricao" type="text" className="form-control" />
                    </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="iptAno" label="Ano: *"> 
                            <input id="iptAno" type="number" className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="selectMes" label="Mês: *"> 
                            <SelectMenu id="selectMes" lista={meses} className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="iptValor" label="Valor: *">
                            <input id="iptValor" type="number" className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="selectTipo" label="Tipo: *">
                            <SelectMenu id="selectTipos" lista={tipos} className="form-control"/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="selectStatus" label="Status:">
                            <input  type="text" className="form-control" disabled={true} />
                        </FormGroup>
                    </div>
                </div>
            
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-success">Salvar</button>
                    <button className="btn btn-danger">Cancelar</button>
                </div>
            </div>
                
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)