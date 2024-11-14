import {
    GET_POPULATIONS
} from "../modules/PopulationModule";

// v1을 사용하는 이유 : API가 향후 확장되거나 변경될 가능성을 두고 버전을 관리하기 쉽게 하기 위해 사용함.
export const callPopulationListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/population/v1/populations`;
    console.log("[PopulationAPICalls] callPopulationListAPI : ", requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());

        if(result.status === 200) {
            console.log('[PopulationAPICalls] callPopulationListAPI Result : ', result);
            dispatch({ type: GET_POPULATIONS, payload: result.data });
        }

    };

}