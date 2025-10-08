import React from "react";
import "./SearchBar.css";
import { useState, useEffect } from "react";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

const SearchBar = ({ value = "", onChange }: Props) => {
  const [active, setActive] = useState(false);
  const input = React.useRef<HTMLInputElement>(null);

  const [localValue, setLocalValue] = useState<string>(value ?? "");

  useEffect(() => {
    setLocalValue(value ?? "");
  }, [value]);

  useEffect(() => {
    if (active && input.current) input.current.focus();
  }, [active]);

  return (
    <div className="searchbar hidden sm:block!">
      <div className="relative w-full flex items-center">
        <input
          type="text"
          className={active ? "input active" : "input"}
          placeholder="Cerca Film o Serie TV"
          ref={input}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (onChange) onChange(localValue);
            }
          }}
        />

        {localValue.length > 0 && (
          <button
            aria-label="Clear search"
            className="absolute right-10 bg-transparent! border-none! focus:outline-none! focus-visible:outline-none!"
            onClick={() => {
              setLocalValue("");
              if (onChange) onChange("");
              if (input.current) input.current.focus();
            }}
          >
            ×
          </button>
        )}

        <button className="btn ml-2" onClick={() => setActive(!active)}>
          <img
            src="/assets/img/search.png"
            alt="search"
            className="contrast-[0.5] hover:invert-100 pl-1"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
