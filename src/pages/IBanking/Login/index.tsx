import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logoFullImage from "../../../assets/logo-full.svg";
import arrowRightImage from "../../../assets/arrow-right.svg";
import { useAuth } from "../../../contexts/AuthContext";
import "./index.css";

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await signIn(formData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="login">
      <img src={logoFullImage} alt="Cora" title="Cora" />
      <h1>Fazer Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="cpf"
          placeholder="Insira seu CPF"
          onChange={handleInputChange}
          value={formData.cpf}
          disabled={isLoading}
        />
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          onChange={handleInputChange}
          value={formData.password}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || (!formData.cpf.length || !formData.password.length)}>
          {isLoading ? 'Carregando...' : 'Continuar'}
          <img src={arrowRightImage} alt="" />
        </button>
      </form>
    </main>
  );
}

export { Login };
