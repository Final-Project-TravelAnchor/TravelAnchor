import {
    GET_POPULATIONS,
    GET_POPULATIONS_DETAIL,
    PUT_POPULATIONS,
    POST_CREATE_POPULATIONS
} from "../modules/PopulationModule";

// 비동기 API 호출 메서드 분리
const fetchGetPopulationData = async (requestURL) => {
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
        console.error('Error fetching population data:', error);
        throw error;
    }
};

const fetchPutPopulationData = async (requestURL, updatedPopulation) => {

    console.log('Fetching population data url: ', requestURL);
    console.log('Fetching population data' , updatedPopulation);

    try {
        const response = await fetch(requestURL, {
            method: 'PUT',
            headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
                // 'Authorization':
				// Authorization:
				// 	'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(updatedPopulation)
        }).then((response) => response.json());

        console.log('[PopulationAPICalls] fetchPutPopulationData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching population data:', error);
        throw error;
    }
};

const fetchPostPopulationData = async (requestURL, createdPopulation) => {

    console.log('Fetching population url: ', requestURL);
    console.log('Fetching population data' , createdPopulation);

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
				// Authorization:
				// 	'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(createdPopulation)
        }).then((response) => response.json());

        console.log('[PopulationAPICalls] fetchPostPopulationData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching population data:', error);
        throw error;
    }
};

// v1을 사용하는 이유 : API가 향후 확장되거나 변경될 가능성을 두고 버전을 관리하기 쉽게 하기 위해 사용함.
export const callPopulationListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/population/v1/populations`;
    console.log("[PopulationAPICalls] callPopulationListAPI : ", requestURL);

    return async (dispatch, getState) => {

        try {

            const result = await fetchGetPopulationData(requestURL);

            if(result.status === 200) {
                console.log('[PopulationAPICalls] callPopulationListAPI Result : ', result);
                dispatch({ type: GET_POPULATIONS, payload: result.data });
            }
            
        } catch (error) {
            console.error('[PopulationAPICalls] callPopulationListAPI Error : ', error);
            // TODO: Error handling code here.
        }


    };
}

export const callPopulationDetailAPI = (populationCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/population/v1/populations/${populationCode}`;
    console.log("[PopulationAPICalls] callPopulationDetailAPI : ", requestURL);

    return async (dispatch, getState) => {

        try {
            
            const result = await fetchGetPopulationData(requestURL);

            if(result.status === 200) {
                console.log('[PopulationAPICalls] callPopulationDetailAPI Result : ', result);
                dispatch({ type: GET_POPULATIONS_DETAIL, payload: result.data });
            }
        } catch (error) {
            console.error('[PopulationAPICalls] callPopulationDetailAPI error : ', error);
        }
    };

};

export const callUpdatePopulationAPI = (updatedPopulation) => {
    console.log('[PopulationAPICalls] callUpdatePopulation', updatedPopulation);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/population/v1/populations`;
    console.log("[PopulationAPICalls] callUpdatePopulationAPI : ", requestURL);

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPutPopulationData(requestURL, updatedPopulation);

            if(result.status === 200) {
                console.log('[PopulationAPICalls] callUpdatePopulationAPI Result : ', result);
                dispatch({ type: PUT_POPULATIONS, payload: result });
            }

        } catch (error) {
            console.error('[PopulationAPICalls] callUpdatePopulationAPI error : ', error);
        }
    };
};

export const callCreatePopulationAPI = (createdPopulation) => {
    console.log('[PopulationAPICalls] callCreatePopulationAPI Start');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/population/v1/populations`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPostPopulationData(requestURL, createdPopulation);

            if(result.status === 200) {
                console.log('[PopulationAPICalls] callCreatePopulationAPI Result : ', result);
                dispatch({ type: POST_CREATE_POPULATIONS, payload: result });
            }

        } catch (error) {
            console.error('[PopulationAPICalls] callUpdatePopulationAPI error : ', error);
        }
    };
};

