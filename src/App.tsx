import "./App.css";
import MainHeader from "./components/MainHeader";
import SerieTV from "./components/SerieTV";
import Film from "./components/Film";
import Tranding from "./components/Tranding";
import { useState, useEffect } from "react";
import FormLogin from "./components/FormLogin";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./components/Firebase";

function App() {
  const [search, setSearch] = useState("");

  // 1. Stato per memorizzare l'utente corrente
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 2. Stato di caricamento
  const [loading, setLoading] = useState(true);

  // 3. useEffect per "ascoltare" i cambiamenti di stato dell'autenticazione
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    //Rimuovere il listener quando il componente viene smontato
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <>
      {currentUser ? (
        <>
          <MainHeader
            searchValue={search}
            onSearchChange={(v: string) => setSearch(v)}
          />
          <SerieTV search={search} />
          <Film search={search} />
          <Tranding search={search} />
        </>
      ) : (
        <FormLogin />
      )}
    </>
  );
}

export default App;
