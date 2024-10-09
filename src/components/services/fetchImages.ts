import axios from "axios";
import { FetchImagesResponse } from "../../types";

const API_KEY = "zEoH3DeqOn03Pt5jL93MEciPbgz48ja1X1nX9BIZdVE";

export const fetchImagesFromAPI = async(searchQuery: string, searchNumber: number = 1): Promise<FetchImagesResponse> => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query: searchQuery, page: searchNumber, per_page: 12 },
    headers: { Authorization: `Client-ID ${API_KEY}` },
  });

  return response.data;
};
