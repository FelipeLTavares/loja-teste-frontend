import axios from 'axios';
import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../../components/Autenticacao/AuthContext';
import Cartao from '../../../components/Cartao/Cartao';
import MenuSup from '../../../components/MenuSup/MenuSup';
import Promo from '../../../components/Promo/Promo';
import Rodape from '../../../components/Rodape/Rodape';
import Sessao from '../../../components/Sessao/Sessao';

import './Vitrine.css';

const Inicio = ()=>{
  //Estados
  const [camisas, setCamisas] = useState([{nome:'', valor:'', fotos: [ {url:''} ] }]);
  const [calcas, setCalcas] = useState([{nome:'', valor:'', fotos: [ {url:''} ] }]);
  //Context
  const {URL_BACKEND} = useContext(AuthContext);
  //Funções
  useEffect( () => {axios.get(`${URL_BACKEND}`)
    .then(resp => {
      setCamisas(resp.data.camisas);
      setCalcas(resp.data.calcas);
    })
    .catch(err => console.log(err))}
  ,[])

  return(
    <>
      <MenuSup></MenuSup>
      <Promo></Promo>
      <div className="Inicio">
        <Sessao titulo='Camisas'>
          {camisas.map((camisa, index)=>{
            return (<div key={index}>
              <Cartao id={camisa._id} key={camisa._id} foto={camisa.fotos[0].url} nome={camisa.nome} alt={camisa.nome} valor={camisa.valor}></Cartao>
            </div>)
          })}
        </Sessao>
        <Sessao titulo='Calças'>
          {calcas.map((calca, index)=>{
            return (<div key={index}>
              <Cartao id={calca._id} key={calca._id} foto={calca.fotos[0].url} nome={calca.nome} alt={calca.nome} valor={calca.valor}></Cartao>
            </div>) 
          })}
        </Sessao>
      </div>
      <Rodape></Rodape>
    </>
  )
}

export default Inicio;