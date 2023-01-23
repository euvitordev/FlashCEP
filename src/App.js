import { FiSearch } from 'react-icons/fi';
import './app.css';
function App() {
  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" name="" id="" placeholder="Digite seu cep..."/>
        <button className="buttonSearch">
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      <main className='main'>
        <h2>CEP: 27351-729</h2>
        <span>Rua teste</span>
        <span>Complemento: Algum compremento</span>
        <span>Colonia</span>
        <span>Barra Mansa - RJ</span>

      </main>
    </div>
  );
}

export default App;
