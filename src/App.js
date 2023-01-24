import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import { MdOutlinePlace } from "react-icons/md"
import { MdContentCopy } from "react-icons/md"
import "./app.css"
import api from "./services/api"
import CopyToClipboard from "react-copy-to-clipboard"

function App() {
  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})
  const enderecoCompleto = `${cep.cep}, ${cep.logradouro}, ${cep.complemento}, ${cep.bairro}, ${cep.localidade} - ${cep.uf} - ${cep.ddd}`

  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum cep!")
      return
    }

    //Remover espaços em branco do início e final do CEP
    let cepSemEspaco = input.trim()

    //Remover traço do CEP
    cepSemEspaco = cepSemEspaco.replace(/-/g, "")

    try {
      const response = await api.get(`${cepSemEspaco}/json`)
      setCep(response.data)
      setInput("")
    } catch {
      alert("Erro ao buscar")
      setInput("")
    }
  }

  return (
    <div className="container">
      <header>
        <div className="logo">
          <span className="place">
            <MdOutlinePlace size={32} color="#FFF" />
          </span>
          <h2>FlashCEP</h2>
        </div>
      </header>

      <main>
        <div className="mainContent">
          <h1 className="title">Bem-vindo 👋</h1>
          <p className="subTitle">Descubra seu endereço de forma rápida</p>
          <div className="containerInput">
            <input
              type="text"
              name=""
              id=""
              placeholder="Digite seu cep..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  handleSearch()
                }
              }}
            />
            <button className="buttonSearch" onClick={handleSearch}>
              <FiSearch size={25} color="#24292f" />
            </button>
          </div>
        </div>

        {Object.keys(cep).length > 0 && (
          <div className="answer">
            <div className="cepAddress">
              <h2>
                CEP: <span>{cep.cep}</span>
              </h2>
              <CopyToClipboard
                text={enderecoCompleto}
                onCopy={() => {
                  alert("Endereço copiado para a área de transferência!")
                  setCep({})
                }}
              >
                <div className="copy">
                  <span className="copyIcon">
                    Copiar
                    <MdContentCopy size={16} color="#0969DA" />
                  </span>
                </div>
              </CopyToClipboard>
            </div>

            <div className="address">
              <h3>
                Logradouro: <span>{cep.logradouro}</span>
              </h3>
              <h3>
                Complemento: <span>{cep.complemento}</span>
              </h3>
              <h3>
                Bairro: <span>{cep.bairro}</span>
              </h3>
              <h3>
                Localidade:{" "}
                <span>
                  {cep.localidade} - {cep.uf}
                </span>
              </h3>
              <h4>
                DDD: <span>{cep.ddd}</span>
              </h4>
            </div>
          </div>
        )}
      </main>
      <footer>
        <div className="footerLogo">
          <span className="place">
            <MdOutlinePlace size={25} color="#6E7781" />
          </span>
          <span>© 2023 FlashCEP</span>
        </div>
        <a href="mailto:dev.vitorlucas@gmail.com">Contato</a>
        <a href="https://github.com/euvitordev/FlashCEP">GitHub</a>
        <a href="https://www.linkedin.com/in/euvtitordev/">LinkedIn</a>
      </footer>
    </div>
  )
}

export default App
