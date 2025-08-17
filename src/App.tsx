import { Outlet } from 'react-router-dom';
import './App.css';
import Cabecalho from "./components/Cabecalho";
import Rodape from './components/Rodape';


const App = () => {
  return(
    <>
      <Cabecalho />
      <Outlet/>
      <Rodape/>
    </>
    
  )
}

export default App;