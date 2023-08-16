import { createClient } from "@supabase/supabase-js";
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import Dashboard from "../pages/Dashboard/Dashboard";
 
// const url = "https://wlfzthnhnlvawdddjbtq.supabase.co";
// const api = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZnp0aG5obmx2YXdkZGRqYnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxNjk4MDgsImV4cCI6MjAwNzc0NTgwOH0.suZb-G8fKanvz6NqWGS3Ga9Ccilotw5SRoPXonXxZcw"
// const supabase = createClient(url, api);

const url = import.meta.env.VITE_REACT_URL;
const api = import.meta.env.VITE_REACT_API;
const supabase = createClient(url, api);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsLoading(false);
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleClick = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return(
    <>
        <Routes>
          <Route path="/" element={<Landing session={session} handleClick={handleClick}/>} />
          <Route path="/dashboard" element={<Dashboard/>} /> 
        </Routes>
    </>
  );
  // if (!session) {
  //   return (
  //     <>
  //       <Button colorScheme='blue' onClick={handleClick}>Button</Button>
  //     </>
      
  //   )
  // }
  // else {
  //   return (<div>Logged in!</div>)
  // }

  // return (
  //   <>
  //     <h1>Quizz app</h1>
  //     {!session?<Button colorScheme='blue' onClick={handleClick}>Button</Button>:<div>Logged in!</div>}
  //   </>
  // )
}

export default App;
