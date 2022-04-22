import './MenuSup.css';
import {Link} from 'react-router-dom'

const MenuSup = ()=>{
  return(
    <header className="MenuSup">
      <div className="MenuSupLogo">
        <Link className='MenuSupLogo' to='/'>Logo</Link>
      </div>

      <nav className="MenuSupItens">
        <Link className='MenuSupLink' to='/'>Vitrine</Link>
        <Link className='MenuSupLink' to='/produtos'>Produtos</Link>
      </nav>
    </header>
  )
}

export default MenuSup;