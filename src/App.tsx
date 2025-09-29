// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import MainHeader from "./components/MainHeader";
import SerieTV from "./components/SerieTV";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <MainHeader />
      <SerieTV />
    </>
  );
}

export default App;
