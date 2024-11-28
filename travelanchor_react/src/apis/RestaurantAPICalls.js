import axios from "axios";

export const callGetRestaurantAPI = async ({ type, city }) => {
	try {
		const response = await axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:5000/api/places`, {
			params: { type, city }, // 서버로 type과 city 전달
		});
		return response.data.results || [];
	} catch (err) {
		console.error("Error fetching places:", err.message);
		throw err;
	}
};

export const callRestaurantDetailAPI = async ({ place_id }) => {
	try {
		const response = await axios.get(`http://${process.env.REACT_APP_RESTAPI_IP}:5000/api/places/details`, {
			params: { place_id }, // 서버로 place_id 전달
		});
		return response.data || [];
	} catch (err) {
		console.error("Error fetching place details:", err.message);
		throw err;
	}
};

	// 	const places = response.data;

	// 	console.log("API Response:", places);

	// 	if (places.status === "OK") {
	// 		return {
	// 			name: places.name || "N/A",
	// 			address: places.formatted_address || "N/A",
	// 			phone: places.formatted_phone_number || "N/A",
	// 			international_phone: places.international_phone_number || "N/A",
	// 			rating: places.rating || "N/A",
	// 			user_ratings_total: places.user_ratings_total || 0,
	// 			website: places.website || null,
	// 			photos: (places.photos || []).map((photo) => ({
	// 				height: photo.height || 0,
	// 				width: photo.width || 0,
	// 				photo_reference: photo.photo_reference || "",
	// 				html_attributions: photo.html_attributions || [],
	// 			})),
	// 			reviews: (places.reviews || []).map((review) => ({
	// 				author_name: review.author_name || "Anonymous",
	// 				rating: review.rating || "N/A",
	// 				text: review.text || "No review text provided",
	// 				relative_time_description:
	// 					review.relative_time_description || "N/A",
	// 				profile_photo_url: review.profile_photo_url || null,
	// 			})),
	// 			location: {
	// 				lat: places.geometry?.location?.lat || 0,
	// 				lng: places.geometry?.location?.lng || 0,
	// 			},
	// 			opening_hours: places.opening_hours || null,
	// 			business_status: places.business_status || "N/A", 
	// 			serves: {
	// 				dine_in: places.dine_in || false,
	// 				takeout: places.takeout || false,
	// 				delivery: places.delivery || false,
	// 			}, 
	// 		};
	// 	} else {
	// 		throw new Error("Place not found");
	// 	}
	// } catch (err) {
	// 	console.error("Error fetching restaurant details:", err.message);
	// 	throw new Error(
	// 		"Failed to fetch restaurant details. Please try again later."
	// 	);
	// }
// };

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
