import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdOutlinePlace } from 'react-icons/md';
import { MdContentCopy } from 'react-icons/md';
import logo from './images/logo.svg';
import './app.css';
import api from './services/api';
import CopyToClipboard from 'react-copy-to-clipboard';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const enderecoCompleto = `${cep.cep}, ${cep.logradouro}, ${cep.complemento}, ${cep.bairro}, ${cep.localidade} - ${cep.uf}`;

  async function handleSearch(){

    if(input === ''){
      alert('Preencha algum cep!')
      return;
    }

    //Remover espaços em branco do início e final do CEP
    let cepSemEspaco = input.trim();

    //Remover traço do CEP
    cepSemEspaco = cepSemEspaco.replace(/-/g,'');

    try{
      const response = await api.get(`${cepSemEspaco}/json`);
      setCep(response.data);
      setInput("");
    }
    catch{
      alert('Erro ao buscar');
      setInput("")
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="logo">
          <span className='place'>
            <MdOutlinePlace size={72} color="#FFF"/>
          </span>
          <img src={logo} alt="" />
        </div>
        <h1 className="title">Bem-vindo 👋</h1>
        <p className="subTitle">Descubra seu endereço de forma rápida</p>
        <div className="containerInput">
          <input type="text" 
          name="" id="" 
          placeholder="Digite seu cep..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if(event.keyCode === 13){
              handleSearch();
            }
          }}        
          />
          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="#FFF"/>
          </button>
        </div>
      </div>
      
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <CopyToClipboard text={enderecoCompleto} onCopy={() => {
            alert('Endereço copiado para a área de transferência!');
            setCep({});
            }}>
            <span className='copyIcon'>
              <MdContentCopy size={25} color="#FFF"/>
            </span>
          </CopyToClipboard>
          <h2>CEP: {cep.cep} </h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Localidade: {cep.localidade} - {cep.uf}</span>
          <span>ddd: {cep.ddd}</span>
        </main>
      )}
      <footer>
      <div className="footerLogo">
          <span className='place'>
            <MdOutlinePlace size={25} color="#f1f1f1"/>
          </span>
          <span>© 2023 FlashCEP</span>
        </div>
        <a href="mailto:dev.vitorlucas@gmail.com">Contato</a>
        <a href="https://github.com/euvitordev/FlashCEP">GitHub</a>
        <a href="https://www.linkedin.com/in/euvtitordev/">LinkedIn</a>
      </footer>
    </div>
  );
}

export default App;
