import './Gerenciador.css';

import { useContext, useState } from 'react';
import axios from 'axios';
import Resizer from "react-image-file-resizer";
import { Navigate } from 'react-router-dom';

import Cartao from '../../../components/Cartao/Cartao';
import MenuSup from '../../../components/MenuSup/MenuSup';
import Rodape from '../../../components/Rodape/Rodape';
import { AuthContext } from '../../../components/Autenticacao/AuthContext';

const Gerenciador = () => {
  //TESTE
  






  //Estados
  const [dados, setDados] = useState({ nome: '', tipo: '', valor: '', foto: '' });
  const [previa, setPrevia] = useState('');
  const [dadosDelete, setDadosDelete] = useState();
  //Context
  const { logado, token, URL_BACKEND } = useContext(AuthContext);

  //Funções
  //Input Text
  const handleInputText = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value })
  }
  //Input Files
  const handleInputFiles = (e) => {
    gerarBases64(e).then(res => setDados({ ...dados, foto: res }))
  }
  const gerarBases64 = async (e) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fotos = [...e.target.files];
        let lista = [];
        fotos.forEach(async element => {
          await resizeFile(element).then(res => lista.push(res));
          if (lista.length === fotos.length) { resolve(lista) }
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(file, 400, 400, "JPEG", 100, 0, (uri) => { resolve(uri); }, "base64");
    })

  //FUNCOES CRUD
  //Postar Produto
  const postDados = () => {
    axios({
      url: `${URL_BACKEND}/gerenciador/produtos/postar`,
      method: 'post',
      data: {...dados, token: token}
    }).then(res => {
      alert(res.data);
    })
    .catch(err => console.log(err))
  }
/*   //Procurar a Previa
  const procurarPrevia = () => {
    axios.post(`${URL_BACKEND}/gerenciador/previa`, { nome: previa })
      .then(resp => {
        if (resp.data.length === 0) {
          alert('Nenhum Produto com este nome foi encontrado')
        } else {
          setDadosDelete(resp.data)
        }
      })
      .catch(err => console.log(err))
  } */
  //Deletar Produto
  const deletarProduto = ()=>{
    axios({
      method: 'delete',
      url: `${URL_BACKEND}/gerenciador/produtos/deletar`,
      data: {
        idProduto: previa,
        token: token
      }
    }).then(resp => alert(resp.data));
  }
  //Verificar se está autenticado
  if (!logado) {
    return <Navigate to='/login'/>
  }

  return (
    <>
      <MenuSup></MenuSup>
      <div className='Gerenciador'>
        <div className="GerenciadorCadastrar">
          <h2 className='GerTitulo'>Cadastrar Novo Produto</h2>
          <label className='GerLabel'>Nome</label>
          <input name='nome' type="text" placeholder='Digite o nome do produto' className='GerInput ' value={dados.nome} onChange={e => handleInputText(e)} />
          <label className='GerLabel'>Tipo</label>
          <input name='tipo' type="text" placeholder='Digite o tipo do produto' className='GerInput ' value={dados.tipo} onChange={e => handleInputText(e)} />
          <label className='GerLabel'>Valor</label>
          <input name='valor' type="number" placeholder='Use ponto para separar casas decimais' className='GerInput ' value={dados.valor} onChange={e => handleInputText(e)} />

          <label className='GerLabel'>Foto</label>
          <input type="file" multiple className='GerInput ' onChange={e => handleInputFiles(e)} />

          <button className='GerBtn' onClick={postDados}>ENVIAR</button>
          <br />
        </div>

        <div className="GerenciadorDelete">
          <h2 className='GerTitulo'>Deletar Produtos</h2>
          <label className='GerLabel'>Qual o nome do produto que deseja apagar?</label>
          <input className='GerInput' placeholder='Digite o ID do produto' type='text' value={previa} onChange={e => setPrevia(e.target.value)}></input>
          
          {/* <button className='GerBtn' onClick={procurarPrevia}>VER PRODUTO</button>
          {dadosDelete && <button className='GerBtn' onClick={deletarProduto}>DELETAR</button>}
          {dadosDelete && <Cartao foto={dadosDelete[0].foto[0]} nome={dadosDelete[0].nome} valor={dadosDelete[0].valor}></Cartao>} */}
          <button className='GerBtn' onClick={deletarProduto}>DELETAR</button>
        </div>
      </div>
      <Rodape></Rodape>
    </>
  )
}

export default Gerenciador;