import api from "../api/request";
import type { AxiosResponse } from "axios";
import type { MovieResponse } from "../types/movie";

export async function fetchMovies(
  query: string,
  page: number
): Promise<MovieResponse> {
  const response: AxiosResponse<MovieResponse> = await api.get("movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  });

  return response.data;
}
