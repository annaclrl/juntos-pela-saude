import { Outlet, useLocation } from 'react-router-dom';
import './globals.css';
import Cabecalho from "./components/Cabecalho";
import Rodape from './components/Rodape';


const App = () => {
  const location = useLocation( );
  const rotasSemLayout = ["/login", "/cadastro"]
  const showHeaderFooter = !rotasSemLayout.includes(location.pathname.trim());
  
  return(
    <>
      {showHeaderFooter && <Cabecalho />}
      <Outlet/>
      {showHeaderFooter && <Rodape/>}
    </>
    
  )
}

export default App;