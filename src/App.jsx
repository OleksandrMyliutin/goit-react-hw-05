// import './App.css'

import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const getData = async () =>{
      try{
        const data = await fetchResults();
        setResults( prev => [...prev, ...data]);
      } catch (error) {
        console.log(error)
      }
    }
  });
  return (
    <>
      
    </>
  )
}

export default App
