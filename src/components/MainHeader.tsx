import SearchBar from "./searchbar/SearchBar";

type Menu = { id: number; category: string };

type Props = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

const headerMenu: Menu[] = [
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
  return (
    <header className="flex h-14 items-center justify-between">
      <img
        src="/src/assets/img/330px-Netflix_2015_N_logo.svg.png"
        alt="logo"
        className="max-w-[30px] cursor-pointer"
      />
      <ul className="flex flex-row gap-x-14 px-16">
        {headerMenu.map((link) => (
          <li key={link.id} className="cursor-pointer">
            <p>{link.category}</p>
          </li>
        ))}
      </ul>

      <div className="flex gap-x-10 grow-1 justify-end h-[30px]">
        <SearchBar value={searchValue ?? ""} onChange={onSearchChange} />
        <img
          src="/src/assets/img/pngwing.com.png"
          alt="cast"
          className="contrast-[0.5] cursor-pointer hover:invert-100"
        />
        <img
          src="/src/assets/img/user.png"
          alt="user"
          className="contrast-[0.5] cursor-pointer hover:invert-100"
        />
      </div>
    </header>
  );
}

export default MainHeader;
