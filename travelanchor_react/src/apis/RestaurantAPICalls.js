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

// import axios from "axios";

// export const callGetRestaurantAPI = async ({ type, city }) => {

//   const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

// try {
//   const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}%20in%20${city}&key=${API_KEY}`;
//   console.log("Requesting Google API:", url);

//   const response = await axios.get(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": 'application/json',
//       Accept: '*/*',
//       'Access-Control-Allow-Origin': '*',
//       credentials: 'true',
//     },
//   })

//   // 응답 데이터를 클라이언트로 전달
//   response.json(response.data);
// } catch (error) {
//   if (error.response) {
//   console.error("Google API error:", error.response.data);
//   // res.status(error.response.status).json({ error: error.response.data });
// } else {
//   console.error("Google API error:", error.message);
//   // res.status(500).json({ error: error.message });
// }
// }

// }