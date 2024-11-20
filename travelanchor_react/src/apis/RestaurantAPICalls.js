// 

import axios from "axios";

export const callGetRestaurantAPI = async ({ type, city }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/places", {
      params: { type, city }, // 서버로 type과 city 전달
    });
    return response.data.results || [];
  } catch (err) {
    console.error("Error fetching places:", err.message);
    throw err;
  }
};