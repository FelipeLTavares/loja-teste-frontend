import './Rodape.css';
import {Link} from 'react-router-dom';

const Rodape = ()=>{
  return(
    <footer className="Rodape">
      <div className="RodapeLinks">
        <h2>Sociais</h2>
        <Link to='/' className='RodapeLink'>Facebook</Link>
        <Link to='/' className='RodapeLink'>Instragram</Link>
        <Link to='/' className='RodapeLink'>Twitter</Link>
      </div>

      <div className="RodapeLinks">
      <h2>Sobre a Empresa</h2>
        <Link to='/' className='RodapeLink'>Institucional</Link>
        <Link to='/' className='RodapeLink'>Missao e Valores</Link>
        <Link to='/' className='RodapeLink'>Contato</Link>
      </div>

      <div className="RodapeLinks">
      <h2>Links Uteis</h2>
        <Link to='/gerenciador' className='RodapeLink'>Gerenciador</Link>
        <Link to='/' className='RodapeLink'>Lorem </Link>
        <Link to='/' className='RodapeLink'>Ipsum</Link>
      </div>
    </footer>
  )
}

export default Rodape;