import { useReducer, useEffect } from "react";

interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type Action<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_FAILURE"; payload: string };

function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: null };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error("Azione non riconosciuta");
  }
}

export function useFetch<T>(url: string) {
  const initialState: State<T> = {
    data: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(fetchReducer<T>, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Errore di rete");
        const jsonData: T = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: jsonData });
      } catch (e) {
        dispatch({ type: "FETCH_FAILURE", payload: (e as Error).message });
      }
    };
    fetchData();
  }, [url]);

  return state;
}
