import { NovaDespezaType } from '../types/despezas';

interface IProps {
    despeza: NovaDespezaType
}

function InformationD({ despeza }: IProps) {
    console.log(despeza, 'despeza')
    return (
        <div>
            <ul>
            <li>{despeza.description}</li>
            <li>{despeza.valor}</li>
            </ul>
        </div>
    )
}

export default InformationD;