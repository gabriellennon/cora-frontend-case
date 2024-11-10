import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.svg";

import "./index.css";
import { LogoutButton } from "../../components/LogoutButton";

function Home() {
  return (
    <>
      <div className="header-home">
        <LogoutButton />
      </div>
      <main id="page">
        <div>
          <img src={logoImage} alt="Cora" title="Cora"></img>
          <h1>Hey There &#128075;</h1>
          <h2>Tenha um ótimo teste!!!</h2>
          <p>
            <strong>Vamos começar?</strong> Como você faria os botões abaixo
            abrirem as suas respectivas páginas? (Comece pela{" "}
            <strong>TODO LIST</strong>, pois nela contem os próximos passos)
          </p>
          <p className="disclaimer">
            &#9888; Você pode encontrar alguns <strong>erros</strong> no meio do
            caminho, não desanime e fique atento para conseguir{" "}
            <strong>visualizar</strong> e <strong>renderizar</strong> as páginas.
          </p>
          <ul className="buttons">
            <li>
              <Link to="/todo">
                TO-DO LIST
              </Link>
            </li>
            <li>
              <Link to="/ibanking">
                IBANKING
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}

export default Home;
