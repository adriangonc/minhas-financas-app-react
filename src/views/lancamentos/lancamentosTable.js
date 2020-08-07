import React, { useState } from 'react';
import currencyFormatter from 'currency-formatter'

export default props => {
    const [isShown, setIsShown] = useState(false);
    const rows = props.lancamentos.map( lancamento => {
        return(
            <tr className="trDefalt" key={lancamento.id} 
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                <td>{lancamento.descricao}</td>
                <td>{ currencyFormatter.format( lancamento.valor, {locale: 'pt-BR'} )}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                {isShown && (
                <td>
                    <button type="button" 
                            title="Efetivar"
                            className="btn-little btn-success-l" 
                            disabled={lancamento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatusLancamento(lancamento, 'EFETIVADO')} >
                            <i className="pi pi-check" ></i>
                    </button>

                    <button type="button" 
                            className="btn-little btn-warning-l" 
                            title="Cancelar"
                            disabled={ lancamento.status !== 'PENDENTE' }
                            onClick={e => props.alterarStatusLancamento(lancamento, 'CANCELADO')}>
                            <i className="pi pi-times"></i>
                    </button>

                    <button type="button" 
                            className="btn-little btn-primary-l"
                            title="Editar"
                            onClick={e => props.editAction(lancamento.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>

                    <button type="button" 
                            className="btn-little btn-danger-l"
                            title="Excluir"
                            onClick={e => props.deleteAction(lancamento)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td> )}
                <td>

                </td>
            </tr>
        )
    } )

    return(
        <table className="tableLancamento table-hover" >
            <thead>
                <tr>
                    <th scope="col" className="colunDescription">Descrição</th>
                    <th scope="col" className="colunValue">Valor</th>
                    <th scope="col" className="colunType">Tipo</th>
                    <th scope="col" className="colunMonth">Mês</th>
                    <th scope="col" className="colunSituation">Situação</th>
                    {isShown && (
                        <th scope="col">Ações</th>
                    )}
                </tr>
            </thead>

            <tbody> 
                {rows}
            </tbody>
            
        </table>
    )
}