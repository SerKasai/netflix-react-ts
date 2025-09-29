import { useFetch } from "../hooks/FetchReducer";

type List = {
  id: number;
  origin_language: string;
  original_name: string;
  overview: string;
  name: string;
  poster_path: string;
  vote: number;
};

const URLSearchParams = {
  api_key: "&api_key=6cad6dafb0a219bd44da63ec9029cbb4",
  language: "?language=it-IT",
  string_image: "https://image.tmdb.org/t/p/w342",
  // query: state.search
};

function SerieTV() {
  const baseURL = `https://api.themoviedb.org/3/tv/popular${URLSearchParams.language}${URLSearchParams.api_key}`;
  const { data: posters, loading, error } = useFetch<List[]>(baseURL);

  console.log(posters);

  if (loading) {
    return <div>Caricamento eroi...</div>;
  }
  if (error) {
    return <div>Errore di caricamento! {error}</div>;
  }

  return (
    <main>
      <div className="flex flex-col items-start">
        <h2 className="p-4">Serie TV popolari</h2>
        <ul className="flex justify-between flex-wrap gap-y-5 w-full">
          {posters?.results.slice(0, 6).map((tv: List) => (
            <li key={tv.id}>
              <img
                src={`${URLSearchParams.string_image}${tv.poster_path}`}
                alt="poster"
                className="w-72 aspect-[3/4] cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
export default SerieTV;
