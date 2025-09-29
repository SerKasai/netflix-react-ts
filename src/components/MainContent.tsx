// import SerieTV from "./SerieTV";

// import { useFetch } from "../hooks/FetchReducer";

// type List = {
//   id: number;
//   origin_language: string;
//   original_name: string;
//   overview: string;
//   name: string;
//   poster_path: string;
//   vote: number;
// };

// const URLSearchParams = {
//   api_key: "6cad6dafb0a219bd44da63ec9029cbb4",
//   language: "it_IT",
//   string_image: "https://image.tmdb.org/t/p/w342",
//   // query: state.search
// };

// function MainContent() {
//   const baseURL = "https://api.themoviedb.org/3/";
//   const { data: posters, loading, error } = useFetch<List[]>(baseURL);

//   console.log(posters);

//   if (loading) {
//     return <div>Caricamento eroi...</div>;
//   }
//   if (error) {
//     return <div>Errore di caricamento! {error}</div>;
//   }

//   return (
//     <main>
//       <div>
//         Serie TV popolari
//         <ul>
//           {posters?.map((tv) => (
//             <li key={tv.id}>
//               <img src={`${URLSearchParams.string_image}${tv.poster_path}`} alt="poster" />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </main>
//   );
// }
