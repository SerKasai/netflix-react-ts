import { useFetch } from "../hooks/FetchReducer";
import "./SerieTV.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useWindowWidth } from "../hooks/useWindowWidth";

type List = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  title: string;
  poster_path: string;
};

const URLSearchParams = {
  api_key: "&api_key=6cad6dafb0a219bd44da63ec9029cbb4",
  language: "?language=it-IT",
  string_image: "https://image.tmdb.org/t/p/w342",
};

type Props = {
  search?: string;
};

function Film({ search = "" }: Props) {
  const baseURL = `https://api.themoviedb.org/3/movie/popular${URLSearchParams.language}${URLSearchParams.api_key}`;
  const {
    data: posters,
    loading,
    error,
  } = useFetch<{ results: List[] }>(baseURL);

  console.log(posters);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  const width = useWindowWidth();
  const useSlider = width > 1800;

  if (loading) {
    return <div>Caricamento...</div>;
  }
  if (error) {
    return <div>Errore di caricamento! {error}</div>;
  }

  const query = search.trim().toLowerCase();
  const results: List[] = posters?.results ?? [];
  const filtered = results.filter((movie: List) => {
    if (!query) return true;
    const title = (movie.title || "").toString().toLowerCase();
    const original = (movie.original_title || "").toString().toLowerCase();
    return title.includes(query) || original.includes(query);
  });
  const items = filtered;

  return (
    <main>
      <div className="flex flex-col items-start">
        <h2 className="p-4 text-white">Film popolari</h2>
        <ul className="justify-between flex-wrap gap-y-5 w-full cursor-default">
          {useSlider ? (
            <Slider {...settings}>
              {items.map((movie: List) => (
                <li key={movie.id} className="w-72! h-96! block!">
                  <div id="card-container" className="h-full">
                    <img
                      src={`${URLSearchParams.string_image}${movie.poster_path}`}
                      alt="poster"
                      className="w-72 aspect-[3/4] cursor-pointer img-card"
                    />
                    <div
                      id="info"
                      className="relative bottom-full hidden h-full overflow-auto"
                    >
                      <h2 className="text-shadow-lg text-shadow-black text-red-600 py-4">
                        {movie.title}
                      </h2>

                      <h2>
                        {movie.title !== movie.original_title && (
                          <>
                            Titolo originale: <br />
                            <p className="text-shadow-lg text-shadow-red-700 py-2.5">
                              {movie.original_title} ({" "}
                              {movie.original_language.toUpperCase()} )
                            </p>
                          </>
                        )}
                      </h2>
                      <p>{movie.overview}</p>
                    </div>
                  </div>
                </li>
              ))}
            </Slider>
          ) : (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {items.map((movie: List) => (
                <div key={movie.id} className="p-2">
                  <img
                    src={`${URLSearchParams.string_image}${movie.poster_path}`}
                    alt="poster"
                    className="w-full aspect-[3/4] object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </ul>
      </div>
    </main>
  );
}
export default Film;
