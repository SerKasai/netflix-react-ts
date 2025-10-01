import { useFetch } from "../hooks/FetchReducer";
import "./SerieTV.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type List = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  title: string;
  poster_path: string;
  vote_average: number;
};

const URLSearchParams = {
  api_key: "&api_key=6cad6dafb0a219bd44da63ec9029cbb4",
  language: "?language=it-IT",
  string_image: "https://image.tmdb.org/t/p/w342",
};

function Film() {
  const baseURL = `https://api.themoviedb.org/3/movie/popular${URLSearchParams.language}${URLSearchParams.api_key}`;
  const { data: posters, loading, error } = useFetch<List[]>(baseURL);

  console.log(posters);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  if (loading) {
    return <div>Caricamento eroi...</div>;
  }
  if (error) {
    return <div>Errore di caricamento! {error}</div>;
  }

  return (
    <main>
      <div className="flex flex-col items-start">
        <h2 className="p-4">Film popolari</h2>
        <ul className="justify-between flex-wrap gap-y-5 w-full cursor-default">
          <Slider {...settings}>
            {posters?.results.map((movie: List) => (
              <li key={movie.id} className="w-72! h-96! block!">
                <div id="card-container" className="h-full">
                  <img
                    src={`${URLSearchParams.string_image}${movie.poster_path}`}
                    alt="poster"
                    className="w-72 aspect-[3/4] cursor-pointer img-card"
                  />
                  <div id="info" className="relative bottom-full hidden h-full">
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
        </ul>
      </div>
    </main>
  );
}
export default Film;
