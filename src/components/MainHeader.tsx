import SearchBar from "./searchbar/SearchBar";
import { Link, useNavigate } from "react-router";
import { auth } from "./Firebase";
import { useState, useEffect, useRef } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevActiveElement = useRef<HTMLElement | null>(null);

  // lock body scroll when overlays are open
  useEffect(() => {
    if (mobileOpen || showConfirm) {
      prevActiveElement.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      // focus the close button when opening mobile
      setTimeout(() => {
        if (closeBtnRef.current) closeBtnRef.current.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
      // restore focus
      if (prevActiveElement.current) prevActiveElement.current.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, showConfirm]);

  // close overlays on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showConfirm) setShowConfirm(false);
        if (mobileOpen) setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, showConfirm]);

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
          className="max-w-[30px] cursor-pointer p-[3px] hidden sm:block"
        />
      </Link>
      {/* Desktop nav - hidden on small screens */}
      <ul className="hidden lg:flex flex-row gap-x-14 px-16">
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

      <div className="flex gap-x-10 grow-1 justify-center! h-[30px] items-center sm:justify-end!">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden mr-2"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative bottom-[75%]"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
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
          Logout
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
        {/* Mobile toolbar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-70 bg-black/60 flex">
            <div className="w-3/4 sm:w-1/3 bg-black text-white p-6 transform transition-transform duration-300 translate-x-0">
              <div className="flex items-center justify-between mb-4">
                <Link to="/">
                  <img
                    src="/src/assets/img/330px-Netflix_2015_N_logo.svg.png"
                    alt="logo"
                    className="w-8"
                  />
                </Link>
                <button
                  ref={closeBtnRef}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="text-white bg-transparent border-none! text-2xl"
                >
                  ✕
                </button>
              </div>
              <nav className="flex flex-col gap-3 mb-4">
                {navbar.map((link) => (
                  <Link
                    className="text-white!"
                    key={link.id}
                    to={
                      "/" + link.category.toLocaleLowerCase().replace(/\s/g, "")
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.category}
                  </Link>
                ))}
              </nav>
              <div className="mb-4">
                <SearchBar
                  value={searchValue ?? ""}
                  onChange={onSearchChange}
                />
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/src/assets/img/pngwing.com.png"
                  alt="cast"
                  className="w-6"
                />
                <button
                  id="logout-mobile"
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => {
                    setMobileOpen(false);
                    setShowConfirm(true);
                  }}
                >
                  Logout
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
