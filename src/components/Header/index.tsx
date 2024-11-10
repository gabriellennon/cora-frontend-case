import { ArrowLeft } from "lucide-react"
import { LogoutButton } from "../LogoutButton"
import { useNavigate } from "react-router-dom";
import './styles.css'

export const Header = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="header-page">
      <button onClick={handleBack} className="back-button">
        <ArrowLeft className="icon" color="#fe3e6d" />
        Voltar
      </button>
      <LogoutButton />
    </div>
  )
}
