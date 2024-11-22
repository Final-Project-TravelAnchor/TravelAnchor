import axios from "axios";

export const callGetTravelDestinationAPI = async ({ cities }) => {
	try {
		const response = await axios.get(
			"http://localhost:5000/api/TravelDestinations",
			{
				params: { cities: JSON.stringify(cities) }, 
			}
		);
		return response.data || [];
	} catch (err) {
		console.error("Error fetching travelDestinations:", err.message);
		throw err;
	}
};
