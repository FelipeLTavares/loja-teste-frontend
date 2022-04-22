import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import MenuSup from '../../../components/MenuSup/MenuSup';
import Promo from '../../../components/Promo/Promo';
import Rodape from '../../../components/Rodape/Rodape';
import Cartao from '../../../components/Cartao/Cartao';
import { AuthContext } from '../../../components/Autenticacao/AuthContext';

import './ListaProdutos.css';

const ListaProdutos = () => {
  //Estados
  const [filtro, setFiltro] = useState({ camisas: false, calcas: false, regatas: false });
  const [produtos, setProdutos] = useState([]);
  //Context
  const {URL_BACKEND} = useContext(AuthContext);

  //Funcoes
  //Inputs
  const handleCheckBox = (e)=>{
      const { name, checked } = e.target;
      setFiltro({ ...filtro, [name]: checked })
  }

  const handleNumber = (e)=>{
    const { name, value } = e.target;
    setFiltro({...filtro, [name]: value})
  }
  //Mostrar Resultados na Tela no Inicio
  let Mapear = produtos.map((produto, i) => {
    return <Cartao id={produto._id} 
    key={produto._id} 
    foto={produto.fotos[0].url} 
    nome={produto.nome} 
    alt={produto.nome} 
    valor={produto.valor}
    ></Cartao>
  })

  //Filtro
  const filtrarProdutos = () => {
    let tipos = [];
    filtro.camisas && tipos.push('Camisa');
    filtro.calcas && tipos.push('Calça');
    filtro.regatas && tipos.push('Regata');
    
    if(tipos.length === 0){
      tipos = ['Camisa', 'Calça', 'Regata']
    }

    const dados = {
      tipos: undefined || tipos,
      valormenor: undefined || filtro.valormenor,
      valormaior: undefined || filtro.valormaior
    };

    axios({
      url: `${URL_BACKEND}/produtos`,
      method: 'post',
      data: dados
    }).then(res => {
      setProdutos(res.data)
    })
    .catch(err => console.log(err))
  }

  useEffect( filtrarProdutos ,[])

  return (
    <>
      <MenuSup></MenuSup>
      <Promo></Promo>
      <div className="Produtos">
        <div className="ProdutosFiltro">
          <div className="ProdFiltroTipos">
            <h3>Tipos:</h3>
            <div className="ProdFilTiposCheck">
              <input type="checkbox" id="camisas" name="camisas" onChange={e => handleCheckBox(e)} />
              <label>  Camisas</label>
            </div>
            <div className="ProdFilTiposCheck">
              <input type="checkbox" id="calcas" name="calcas" onChange={e => handleCheckBox(e)}/>
              <label>  Calças</label>
            </div>
            <div className="ProdFilTiposCheck">
              <input type="checkbox" id="calcas" name="regatas" onChange={e => handleCheckBox(e)} />
              <label>  Regatas</label>
            </div>
          </div>
          <div className="ProdFiltroValores">
            <h3>Faixa de Preço:</h3>
            <div className="ProdFilVal">
              <label>Maior que: </label>
              <input name='valormaior' type='number' className='ProdFilValInp' step='10' placeholder='Maior ou Igual a:' onChange={e => handleNumber(e)}></input>
            </div>
            <div className="ProdFilVal">
              <label>Menor que: </label>
              <input name='valormenor' type='number' className='ProdFilValInp' step='10' placeholder='Menor ou Igual a:' onChange={e => handleNumber(e)}></input>
            </div>
          </div>
          <button className='ProdFiltroBotao' onClick={filtrarProdutos}>Filtrar</button>
        </div>

        <div className="ProdutosFiltrados">
          {Mapear}         
        </div>
      </div>
      <Rodape></Rodape>
    </>
  )
}

export default ListaProdutos;