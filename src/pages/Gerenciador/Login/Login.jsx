import './Login.css';

import axios from 'axios';
import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../../components/Autenticacao/AuthContext';

const Login = () => {
  //Estados
  const [formulario, setFormulario] = useState();

  //Acessar o Context
  const { logado, setLogado, URL_BACKEND } = useContext(AuthContext);
  
  //Funções
  const handleLogin = (e) => {
    e.preventDefault()
    axios({
      url: URL_BACKEND + "/gerenciador/login",
      method: 'post',
      data: formulario
    })
    .then(res => {
      if(res.data === 'Erro'){
        alert('Usuário e/ou senha inválidos')
      } else if(res.data.length === 0) {
        alert('Usuário e/ou senha inválidos')
      } else {
        sessionStorage.setItem('logado', res.data.resultado);
        sessionStorage.setItem('token', res.data.token)
        setLogado(res.data.resultado);
      }
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value })
  }

  const talogado = sessionStorage.getItem('logado');
  if(talogado === 'true'){
    setLogado(true)
  }

  if(logado){
    return <Navigate to='/gerenciador'></Navigate>
  }

  return (
    <div className="Login">
      <img className="LoginImg" src='https://source.unsplash.com/random' alt='Imagem Padrão'></img>

      <div className="LoginForm">
        <form className='Loginformulario'>
          <input name='usuario' type='text' placeholder='Usuário' className='LoginInput' onChange={e => handleChange(e)}></input>
          <input name='senha' type='password' placeholder='Senha' className='LoginInput' onChange={e => handleChange(e)}></input>
          <button className='LoginBotao' onClick={handleLogin}>ENTRAR</button>
        </form>
      </div>
    </div>
  )
}

export default Login;