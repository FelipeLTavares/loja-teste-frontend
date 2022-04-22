import './Produto.css';

import MenuSup from '../../../components/MenuSup/MenuSup';
import Promo from '../../../components/Promo/Promo';
import Rodape from '../../../components/Rodape/Rodape';
import { AuthContext } from '../../../components/Autenticacao/AuthContext';

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Produto = () => {
  //Estados
  const [produto, setProduto] = useState({fotos: [{url:''}]});
  const { idProduto } = useParams();
  //Context
  const { URL_BACKEND } = useContext(AuthContext);
  //Funcoes
  useEffect(() => {
    axios.get(`${URL_BACKEND}/produtos/${idProduto}`)
      .then(resp => {
        setProduto(resp.data[0])
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <MenuSup />
      <div className="Produto">
        <div className="ProdutoContainerFotos">
          <div className="ProdCFMiniaturas">
            <p>M</p><p>I</p><p>N</p><p>I</p><p>A</p><p>T</p><p>U</p><p>R</p><p>A</p><p>S</p>
          </div>

          <div className="ProdCFFoto">
            {produto.fotos[0].url && <img className='ProdCFFotoFoto' src={produto.fotos[0].url}></img>}
          </div>
        </div>

        <div className="ProdutoContainerInfo">
          {
            <div className='ProdutoInfo'>
              <h2 className='InfoComponents'>{produto.nome}</h2>
              <p className='InfoComponents'> Tipo: {produto.tipo}</p>
              <p className='InfoComponents'><strong> Valor: R$ {produto.valor}</strong></p>
              <button className='InfoComponents ProdInfoBotao' onClick={() => alert('Funcionalidade ainda indisponível')}>Comprar</button>
            </div>
          }
        </div>
      </div>
      <Promo />
      <Rodape />
    </>
  )
}

export default Produto;