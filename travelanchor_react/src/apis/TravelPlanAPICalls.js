import {
	GET_TRAVELPLAN,
	GET_TRAVELPLAN_DETAIL,
	PUT_TRAVELPLAN,
	POST_TRAVELPLAN,
    PUT_TRAVEL_PLAN_DELETION_STATUS
} from "../modules/TravelPlanModule";

export const fetchGetTravelPlanData = async (requestURL) => {
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
		console.error('Error fetching travelPlan data:', error);
        throw error;
	}
};

const fetchPutTravelPlanData = async (requestURL, updatedTravelPlan) => {

	console.log('Fetching plan data url: ', requestURL);
    console.log('Fetching plan data' , updatedTravelPlan);

	try {
		const response = await fetch(requestURL, {
			method: 'PUT',
			headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
			},
            body: JSON.stringify(updatedTravelPlan)
        }).then((response) => response.json());

        console.log('[TravelPlanAPICalls] fetchPutTravelPlanData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching plan data:', error);
        throw error;
    }
};

const fetchPostTravelPlanData = async (requestURL, createdTravelPlan) => {

    console.log('Fetching plan url: ', requestURL);
    console.log('Fetching plan data' , createdTravelPlan);

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(createdTravelPlan)
        }).then((response) => response.json());

        console.log('[TravelPlanAPICalls] fetchPostTravelPlanData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching plan data:', error);
        throw error;
    }
};

export const callTravelPlanListAPI = () => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan`;
	console.log("[TravelPlan] callTravelPlanListAPI : ", requestURL);

	return async (dispatch, getState) => {
		try {
			const result = await fetchGetTravelPlanData(requestURL);


			if(result.status === 200) {
				console.log("[TravelPlanCalls] callTravelPlanListAPI Result : ", result);
				dispatch({ type:GET_TRAVELPLAN, payload:result.data });
			}
		} catch (error) {
			console.log("[TravelPlanCalls] callTravelPlanListAPI Error", error);
		}
	};
};

export const callTravelPlanDetailAPI = (travelCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan/${travelCode}`;
    console.log("[TravelPlanAPICalls] callTravelPlanDetailAPI : ", requestURL);

    return async (dispatch, getState) => {

        try {
            
            const result = await fetchGetTravelPlanData(requestURL);

            if(result.status === 200) {
                console.log('[TravelPlanAPICalls] callTravelPlanDetailAPI Result : ', result);
                dispatch({ type: GET_TRAVELPLAN_DETAIL, payload: result.data });
            }
        } catch (error) {
            console.error('[PopulationAPICalls] callPopulationDetailAPI error : ', error);
        }
    };
};

export const callUpdateTravelPlanAPI = (updatedTravelPlan) => {
    console.log('[TravelPlanAPICalls] Update!', updatedTravelPlan);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan`;
    console.log("[TravelPlanAPICalls] callUpdateTravelPlanAPI : ", requestURL);

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPutTravelPlanData(requestURL, updatedTravelPlan);

            if(result.status === 200) {
                console.log('[TravelPlanAPICalls] callUpdateTravelPlanAPI Result : ', result);
                dispatch({ type: PUT_TRAVELPLAN, payload: result });
            }

        } catch (error) {
            console.error('[TravelPlanAPICalls] callUpdateTravelPlanAPI error : ', error);
        }
    };
};

export const callCreateTravelPlanAPI = (createdTravelPlan) => {
    console.log('[TravelPlanAPICalls] Create!!!');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPostTravelPlanData(requestURL, createdTravelPlan);

            if(result.status === 200) {
                console.log('[TravelPlanAPICalls] callCreateTravelPlanAPI Result : ', result);
                dispatch({ type: POST_TRAVELPLAN, payload: result });
            }

        } catch (error) {
            console.error('[TravelPlanAPICalls] callUpdateTravelPlanAPI error : ', error);
        }
    };
};

export const callDeleteTravelPlanAPI = (updatedTravelPlan) => {
    console.log('[TravelPlanAPICalls] callDeleteTravelPlan', updatedTravelPlan);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan/del`;
    console.log("[TravelPlanAPICalls] callDeleteTravelPlanAPI : ", requestURL);

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPutTravelPlanData(requestURL, updatedTravelPlan);

            if(result.status === 200) {
                console.log('[TravelPlanAPICalls] callDeleteTravelPlanAPI Result : ', result);
                dispatch({ type: PUT_TRAVEL_PLAN_DELETION_STATUS, payload: result });
            }

        } catch (error) {
            console.error('[TravelPlanAPICalls] callDeleteTravelPlanAPI error : ', error);
        }
    };
};