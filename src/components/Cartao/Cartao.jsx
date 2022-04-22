import { Link } from 'react-router-dom';
import './Cartao.css';

const Cartao = (props)=>{
  return(
    <div className="Cartao">
      <Link to={'/produtos/'+ props.id} ><img className='CartaoImg' src={props.foto} alt={props.alt}></img></Link>

      <div className="CartaoInfo">
        <div id='CartaoNome'>{props.nome}</div>
        <div id='CartaoValor'>{'R$ ' + props.valor}</div>
      </div>
    </div>
  )
}

export default Cartao;