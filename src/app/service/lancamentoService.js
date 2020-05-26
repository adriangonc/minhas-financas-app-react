import ApiService from '../apiservice'
import ErroValidacao from '../exception/ErroValidacao'

export default class LancamentoService extends ApiService {
    constructor(){
        super( '/api/lancamentos')
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    obterMeses(){
        return [    
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro', value: '1'},
            {label: 'Fevereiro', value: '2'},
            {label: 'Março', value: '3'},
            {label: 'Abril', value: '4'},
            {label: 'Maio', value: '5'},
            {label: 'Junho', value: '6'},
            {label: 'Julho', value: '7'},
            {label: 'Agosto', value: '8'},
            {label: 'Setembro', value: '9'},
            {label: 'Outubro', value: '10'},
            {label: 'Novembro', value: '11'},
            {label: 'Dezembro', value: '12'}]
    }

    obterTipos(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'}
        ]
    }

    salvar(lancamento){
        return this.post('/', lancamento)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }

    consultar(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if(lancamentoFiltro.usuario != null){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        if(lancamentoFiltro.descricao != null){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }

        return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    validar(lancamento){
        const erros = []

        if(!lancamento.ano){
            erros.push("Informe o Ano do lançamento!")
        }
        if(!lancamento.mes){
            erros.push("Informe o Mês do lançamento!")
        }
        if(!lancamento.descricao){
            erros.push("Informe a descrição do lançamento!")
        }
        if(!lancamento.valor){
            erros.push("Informe o valor do lançamento!")
        }
        if(!lancamento.tipo){
            erros.push("Informe o tipo do lançamento!")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }
}