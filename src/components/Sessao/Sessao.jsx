import './Sessao.css';

const Sessao = (props)=>{
  return(
    <div className="Sessao">
      <h2 className='SessaoTitulo'>{props.titulo}</h2>
      <hr className='SessaoLinha'></hr>
      <div className="SessaoFotos">
        {props.children}
      </div>
    </div>
  )
}

export default Sessao;