import { NovaReceitaType } from '../types/receitas';

interface IProps {
    receita: NovaReceitaType
}

function Information({ receita }: IProps) {
    console.log(receita, 'receita')
    return (
        <div>
            <ul>
            <li>{receita.description}</li>
            <li>{receita.valor}</li>
            </ul>
        </div>
    )
}

export default Information;