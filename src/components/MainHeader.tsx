import SearchBar from "./searchbar/SearchBar";
import { Link, useNavigate } from "react-router";
import { auth } from "./Firebase";
import { useState } from "react";

type Menu = { id: number; category: string };

type Props = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

const navbar: Menu[] = [
  {
    id: 1,
    category: "Serie TV",
  },
  {
    id: 2,
    category: "Film",
  },
  {
    id: 3,
    category: "In tendenza",
  },
  {
    id: 4,
    category: "La mia lista",
  },
];

function MainHeader({ searchValue, onSearchChange }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (doRedirect = true) => {
    try {
      await auth.signOut();
      console.log("Logged out");
      if (doRedirect) {
        navigate("/");
      }
    } catch (err) {
      console.error("Logout error", err);
    }
  };
  return (
    <header className="flex h-14 items-center justify-between fixed z-50 bg-black w-[97.4%] p-7">
      <Link to={"/"}>
        <img
          src="/src/assets/img/330px-Netflix_2015_N_logo.svg.png"
          alt="logo"
          className="max-w-[30px] cursor-pointer p-[3px]"
        />
      </Link>
      <ul className="flex flex-row gap-x-14 px-16">
        {navbar.map((link) => (
          <Link
            key={link.id}
            to={"/" + link.category.toLocaleLowerCase().replace(/\s/g, "")}
            className="text-white!"
          >
            <li key={link.id} className="cursor-pointer">
              <p>{link.category}</p>
            </li>
          </Link>
        ))}
      </ul>

      <div className="flex gap-x-10 grow-1 justify-end! h-[30px]">
        <SearchBar value={searchValue ?? ""} onChange={onSearchChange} />
        <img
          src="/src/assets/img/pngwing.com.png"
          alt="cast"
          className="contrast-[0.5] cursor-pointer hover:invert-100"
        />
        <button
          id="logout"
          aria-label="Logout"
          onClick={() => setShowConfirm(true)}
          className="focus:outline-none! bg-transparent! border-none! focus-visible:outline-none!"
        >
          <img
            src="/src/assets/img/user.png"
            alt="user"
            className="contrast-[0.5] cursor-pointer hover:invert-100 absolute top-[24%] right-[2%]"
          />
        </button>
        {showConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/50"
          >
            <div className="bg-black text-white p-6 rounded-md">
              <p className="mb-4">Sei sicuro di voler effettuare il logout?</p>
              <div className="flex gap-4 justify-center">
                <button
                  className="px-3 py-1 border rounded text-white border-none!"
                  onClick={() => setShowConfirm(false)}
                >
                  Annulla
                </button>
                <button
                  className="px-3 py-1  text-red-600 rounded border-none!"
                  onClick={async () => {
                    setShowConfirm(false);
                    await handleLogout(true);
                  }}
                >
                  Conferma
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
