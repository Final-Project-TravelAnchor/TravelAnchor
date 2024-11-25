import {
	GET_TRAVEL_DESTINATIONS,
	POST_TRAVEL_DESTINATION,
	DELETE_TRAVEL_DESTINATION,
} from "../modules/FavoriteTravelDestinationModule";

const fetchGetSavedTravelDestinationData = async (requestURL) => {
	try {
		const response = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
			},
		});
		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

const fetchPostTravelDestinationData = async (
	requestURL,
	savedTravelDestination
) => {
	console.log("Fetching travelDestination url: ", requestURL);
	console.log("Fetching travelDestination data", savedTravelDestination);

	try {
		const response = await fetch(requestURL, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(savedTravelDestination),
		}).then((response) => response.json());

		console.log(
			"[FavoriteTravelDestinationAPICalls] fetchPostTravelDestinationData RESULT : ",
			response
		);

		return response;
	} catch (error) {
		console.error("Error fetching TravelDestination data:", error);
		throw error;
	}
};

const fetchDeleteTravelDestinationData = async (requestURL) => {
	try {
		const response = await fetch(requestURL, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
			},
		});
		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

export const fetchSavedTravelDestinationsAPI = async (memberCode) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-destination/v1/travel-destinations/${memberCode}`;
	console.log(
		"[FavoriteTravelDestinationAPICalls] CallGetSavedTravelDestinationAPI",
		requestURL
	);

	return fetchGetSavedTravelDestinationData(requestURL);
};

export const saveTravelDestinationAPI = async (payload) => {
	try {
		const response = await fetch(
			`http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-destination/v1/travel-destination`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			console.error("API error response:", errorData);
			throw new Error(
				`API Error: ${errorData.message || response.statusText}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Error in saveTravelDestinationAPI:", error);
		throw error;
	}
};

export const deleteTravelDestinationAPI = async (
	favoriteCode,
	travelDestinationDTO
) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-destination/v1/travel-destinations/${favoriteCode}`;
	console.log(
		"[FavoriteTravelDestinationAPICalls] CallDeleteTravelDestinationAPI",
		requestURL
	);

	return fetchDeleteTravelDestinationData(
		requestURL,
		"DELETE",
		travelDestinationDTO
	);
};
