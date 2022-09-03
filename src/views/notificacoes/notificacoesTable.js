import React, { useState } from 'react';
import currencyFormatter from 'currency-formatter'

export default props => {
    const [isShown, setIsShown] = useState(false);
    const rows = props.notificacoes.map( notificacao => {
        return(
            <tr className="trDefalt" key={notificacao.id} 
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                <td>{notificacao.descricao}</td>
                <td>Data</td>
                <td>Fonte</td>
                <td>Status</td>

            </tr>
        )
    } )

    return(
        <table responsive="sm" className="tableLancamento table-hover table-striped" >
            <thead>
                <tr>
                    <th scope="col" className="colunDescription">Descrição</th>
                    <th scope="col" className="colunValue">Valor</th>
                    <th scope="col" className="colunType">Tipo</th>
                    <th scope="col" className="colunMonth">Mês</th>
                    
                </tr>
            </thead>

            <tbody> 
                {rows}
            </tbody>
            
        </table>
    )
}