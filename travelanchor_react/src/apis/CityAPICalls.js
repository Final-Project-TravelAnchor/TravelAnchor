
import {
	GET_COUNTRY,
	GET_COUNTRY_CODE,
} from "../modules/AreaModule";

import {
	GET_CITY,
	GET_CITY_CODE,
} from "../modules/CityModule";


const fetchGetCountryData = async (requestURL) => {
	try {
		const response = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			}
		});
		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Error fetching country data:", error);
		throw error;
	}
};

const fetchGetCityData = async (requestURL) => {
	try {
		const response = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			}
		});
		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Error fetching city data:", error);
		throw error;
	}
};

export const callCountryAPI = () => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/country/v1/country`;
	console.log("[CountryAPICalls] callCountryAPI:", requestURL);

	return async (dispatch, getState) => {

		try {

			const result = await fetchGetCountryData(requestURL);

			if(result.status === 200) {
				console.log('[CountryAPICalls] callCountryAPI Result:', result);
				dispatch({type:GET_COUNTRY, payload: result.data});
			}

		} catch (error) {
			console.log('[CountryAPICalls] callCountryAPI error:', error);
		}

	};
};

export const callCountryByCountryCodeAPI = (countryCode) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/country/v1/country/${countryCode}`;
	console.log("[AreaAPICalls] callCountryByCountryAPI:", requestURL);

	return async (dispatch, getState) => {

		try {

			const result = await fetchGetCountryData(requestURL);

			if(result.status === 200) {
				console.log('[AreaAPICalls] callCountryByCountryAPI Result:', result);
				dispatch({type:GET_COUNTRY_CODE, payload: result.data});
			}

		} catch (error) {
			console.log('[AreaAPICalls] callCountryByCountryAPI error:', error);
		}

	};
};

export const callCityAPI = () => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/city/v1/city`;
	console.log("[CityAPICalls] callCityAPI:", requestURL);

	return async (dispatch, getState) => {

		try {

			const result = await fetchGetCityData(requestURL);

			if(result.status === 200) {
				console.log('[CityAPICalls] callCityAPI Result:', result);
				dispatch({type:GET_CITY, payload: result});
			}

		} catch (error) {
			console.log('[CityAPICalls] callCityAPI error:', error);
		}

	};
};

export const callCityByCountryCodeAPI = (countryCode) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/city/v1/city/${countryCode}`;
	console.log("[AreaAPICalls] callCityByCountryCodeAPI:", requestURL);

	return async (dispatch, getState) => {

		try {

			const result = await fetchGetCityData(requestURL);

			if(result.status === 200) {
				console.log('[AreaAPICalls] callCityByCountryCodeAPI Result:', result);
				dispatch({type:GET_CITY_CODE, payload: result});
			}

		} catch (error) {
			console.log('[AreaAPICalls] callCityByCountryCodeAPI error:', error);
		}

	};
};