import { useFetch } from "../hooks/FetchReducer";
import "./SerieTV.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useWindowWidth } from "../hooks/useWindowWidth";

type List = {
  id: number;
  origin_country: string;
  original_name: string;
  overview: string;
  name: string;
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

function SerieTV({ search = "" }: Props) {
  const baseURL = `https://api.themoviedb.org/3/tv/popular${URLSearchParams.language}${URLSearchParams.api_key}`;
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
  const filtered = results.filter((tv: List) => {
    if (!query) return true;
    const name = (tv.name || "").toString().toLowerCase();
    const original = (tv.original_name || "").toString().toLowerCase();
    return name.includes(query) || original.includes(query);
  });
  const items = filtered;

  return (
    <>
      <main className="pt-14">
        <div className="flex flex-col items-start">
          <h2 className="p-4">Serie TV popolari</h2>
          <ul className="justify-between flex-wrap gap-y-5 w-full cursor-default">
            {useSlider ? (
              <Slider {...settings}>
                {items.map((tv: List) => (
                  <li key={tv.id} className="w-72! h-96! block!">
                    <div id="card-container" className="h-full">
                      <img
                        src={`${URLSearchParams.string_image}${tv.poster_path}`}
                        alt="poster"
                        className="w-72 aspect-[3/4] cursor-pointer img-card"
                      />
                      <div
                        id="info"
                        className="relative bottom-full hidden h-full overflow-auto"
                      >
                        <h2 className="text-shadow-lg text-shadow-black text-red-600 py-4">
                          {tv.name}
                        </h2>
                        <h2>
                          {tv.name !== tv.original_name && (
                            <>
                              Titolo originale: <br />
                              <p className="text-shadow-lg text-shadow-red-700 py-2.5">
                                {tv.original_name} ( {tv.origin_country} )
                              </p>
                            </>
                          )}
                        </h2>
                        <p>{tv.overview}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </Slider>
            ) : (
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {items.map((tv: List) => (
                  <div key={tv.id} className="p-2">
                    <img
                      src={`${URLSearchParams.string_image}${tv.poster_path}`}
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
    </>
  );
}
export default SerieTV;
