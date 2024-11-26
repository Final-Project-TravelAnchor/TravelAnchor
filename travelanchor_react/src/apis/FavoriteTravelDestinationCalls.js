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

		if (!response.ok) {
			throw new Error(result.message || "Failed to fetch travel destinations");
		}

		return result;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; 
	}
};

const fetchPostTravelDestinationData = async (requestURL, savedTravelDestination) => {
	console.log("Fetching travelDestination url: ", requestURL);
	console.log("Fetching travelDestination data", savedTravelDestination);

	try {
		const response = await fetch(requestURL, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
				Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
			body: JSON.stringify(savedTravelDestination),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || "Failed to save travel destination");
		}

		console.log("[FavoriteTravelDestinationAPICalls] fetchPostTravelDestinationData RESULT : ", result);
		return result;
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

		if (!response.ok) {
			throw new Error(result.message || "Failed to delete travel destination");
		}

		return result;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export const fetchSavedTravelDestinationsAPI = (memberId) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-destination/v1/travel-destinations/${memberId}`;
	console.log("[FavoriteTravelDestinationAPICalls] CallGetSavedTravelDestinationAPI", requestURL);

	return async (dispatch) => {
		if (!memberId) {
			console.error("Member ID is not provided!");
			return;
		}

		try {
			const result = await fetchGetSavedTravelDestinationData(requestURL);

			console.log("fetchSavedTravelDestinationsAPI Result:", result);
			dispatch({ type: GET_TRAVEL_DESTINATIONS, payload: result.data });
		} catch (err) {
			console.error("fetchSavedTravelDestinationsAPI Fetch Error:", err);
		}
	};
};

export const saveTravelDestinationAPI = (savedTravelDestination) => {
	console.log("[FavoriteTravelDestinationAPICalls] saveTravelDestinationAPI Start");
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-destination/v1/travel-destinations`;

	return async (dispatch, getState) => {
		try {
			const result = await fetchPostTravelDestinationData(requestURL, savedTravelDestination);

			if (result.status === 200) {
				console.log("[FavoriteTravelDestinationAPICalls] saveTravelDestinationAPI Result:", result);
				dispatch({ type: POST_TRAVEL_DESTINATION, payload: result.data });
			}
		} catch (error) {
			console.error("[FavoriteTravelDestinationAPICalls] saveTravelDestinationAPI Error:", error);
		}
	};
};

export const deleteTravelDestinationAPI = (favoriteCode) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-destination/v1/travel-destinations/${favoriteCode}`;
	console.log("[FavoriteTravelDestinationAPICalls] CallDeleteTravelDestinationAPI", requestURL);

	return async (dispatch, getState) => {
		try {
			const result = await fetchDeleteTravelDestinationData(requestURL);

			console.log("deleteTravelDestinationAPI Result:", result);
			dispatch({ type: DELETE_TRAVEL_DESTINATION, payload: favoriteCode });
		} catch (err) {
			console.error("deleteTravelDestinationAPI Fetch Error:", err);
		}
	};
};