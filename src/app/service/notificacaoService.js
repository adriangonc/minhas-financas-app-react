import ApiService from '../apiservice'
import ErroValidacao from '../exception/ErroValidacao'

export default class NotificacaoService extends ApiService {
    constructor(){
        super( '/api/lancamentos')
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    obterTodos(){
        return this.get("")
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

    getNotificacoes() {
        return fetch('https://vast-plains-39497.herokuapp.com/notification/list')
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
     }


}