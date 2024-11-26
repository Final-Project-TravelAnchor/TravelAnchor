import axios from "axios";

export const callGetTravelDestinationAPI = async ({ cities }) => {
	try {
		const response = await axios.get("http://localhost:5000/api/TravelDestinations", {
			params: { cities: JSON.stringify(cities) },
		});
		return response.data || [];
	} catch (err) {
		console.error("Error fetching travelDestinations:", err.message);
		throw err;
	}
};

export const callTravelDestinationDetailAPI = async ({ place_id }) => {
    try {
        const response = await axios.get("http://localhost:5000/api/TravelDestinations/details", {
            params: {
                place_id,
                culturalLandmarks: JSON.stringify(["famous landmark"]) 
            }
        });

        return response.data || {};
    } catch (err) {
        console.error("Error fetching travelDestination details:", err.message);
        throw err;
    }
};

export const callLandmarkDetailAPI = async ({ landmark_id }) => {
    try {
        const response = await axios.get("http://localhost:5000/api/landmark/details", {
            params: {
                landmark_id
            }
        });

        return response.data || {};
    } catch (err) {
        console.error("Error fetching landmark details:", err.message);
        throw err;
    }
};