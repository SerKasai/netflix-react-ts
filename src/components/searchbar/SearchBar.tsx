import React from "react";
import "./SearchBar.css";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [active, setActive] = useState(false);
  const input = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (active && input.current) input.current.focus();
  }, [active]);
  return (
    // <div className="container">

    <div className="searchbar">
      <input
        type="text"
        className={active ? "input active" : "input"}
        placeholder="Cerca Film o Serie TV"
        ref={input}
      />
      <button className="btn" onClick={() => setActive(!active)}>
        <img
          src="/src/assets/img/search.png"
          alt="search"
          className="contrast-[0.5] hover:invert-100 pl-1"
        />
      </button>
    </div>

    // </div>
  );
};

export default SearchBar;
