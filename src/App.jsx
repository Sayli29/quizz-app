import {Routes, Route} from 'react-router-dom';
import { useAuth } from '../utlis/useAuth';
import Landing from '../pages/Landing/Landing';
import Dashboard from "../pages/Dashboard/Dashboard";
 

function App() {
  
  const {session, isLoading, handleClick} = useAuth();
 
  return(
    <>
        <Routes>
          <Route path="/" element={<Landing session={session} handleClick={handleClick}/>} />
          <Route path="/dashboard" element={<Dashboard/>} /> 
        </Routes>
    </>
  ); 
}

export default App;
