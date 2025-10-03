import "./App.css";
import MainHeader from "./components/MainHeader";
import SerieTV from "./components/SerieTV";
import Film from "./components/Film";
import Tranding from "./components/Tranding";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <MainHeader
        searchValue={search}
        onSearchChange={(v: string) => setSearch(v)}
      />
      <SerieTV search={search} />
      <Film search={search} />
      <Tranding search={search} />
    </>
  );
}

export default App;
