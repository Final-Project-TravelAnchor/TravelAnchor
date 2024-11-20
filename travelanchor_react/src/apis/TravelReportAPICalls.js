import {
    GET_TRAVEL_REPORT,
    GET_TRAVEL_REPORT_DETAIL,
    POST_TRAVEL_REPORT,
    PUT_TRAVEL_REPORT,
    PUT_TRAVEL_REPORT_DELETION_STATUS
} from "../modules/TravelReportModule";

// 비동기 API 호출 메서드 분리
const fetchGetTravelReportData = async (requestURL) => {
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
        console.error('Error fetching travelreport data:', error);
        throw error;
    }
};

const fetchPutTravelReportData = async (requestURL, updatedTravelReport) => {

    console.log('Fetching travelreport data url: ', requestURL);
    console.log('Fetching travelreport data' , updatedTravelReport);

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
            body: JSON.stringify(updatedTravelReport)
        }).then((response) => response.json());

        console.log('[TravelReportAPICalls] fetchPutTravelReportData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching travelreport data:', error);
        throw error;
    }
};

const fetchPostTravelReportData = async (requestURL, createdTravelReport) => {

    console.log('Fetching travelreport url: ', requestURL);
    console.log('Fetching travelreport data' , createdTravelReport);

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
				// Authorization:
				// 	'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(createdTravelReport)
        }).then((response) => response.json());

        console.log('[TravelReportAPICalls] fetchPostTravelReportData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching travelreport data:', error);
        throw error;
    }
};

// v1을 사용하는 이유 : API가 향후 확장되거나 변경될 가능성을 두고 버전을 관리하기 쉽게 하기 위해 사용함.
export const callTravelReportListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-report/v1/travel-report`;
    console.log("[TravelReportAPICalls] callTravelReportListAPI : ", requestURL);

    return async (dispatch, getState) => {

        try {

            const result = await fetchGetTravelReportData(requestURL);

            if(result.status === 200) {
                console.log('[TravelReportAPICalls] callTravelReportListAPI Result : ', result);
                dispatch({ type: GET_TRAVEL_REPORT, payload: result.data });
                console.log('[TravelReportAPICalls] dispatch result data:', result.data);
            }
            
        } catch (error) {
            console.error('[TravelReportAPICalls] callTravelReportListAPI Error : ', error);
            // TODO: Error handling code here.
        }

    };
}

export const callTravelReportDetailAPI = (reportCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-report/v1/travel-report/${reportCode}`;
    console.log("[TravelReportAPICalls] callTravelReportDetailAPI : ", requestURL);

    return async (dispatch, getState) => {

        try {
            
            const result = await fetchGetTravelReportData(requestURL);

            if(result.status === 200) {
                console.log('[TravelReportAPICalls] callTravelReportDetailAPI Result : ', result);
                dispatch({ type: GET_TRAVEL_REPORT_DETAIL, payload: result.data });
            }
        } catch (error) {
            console.error('[TravelReportAPICalls] callTravelReportDetailAPI error : ', error);
        }
    };

};

export const callUpdateTravelReportAPI = (reportCode, updatedTravelReport) => {
    console.log('[TravelReportAPICalls] callUpdateTravelReport', updatedTravelReport);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-report/v1/travel-report/${reportCode}`;
    console.log("[TravelReportAPICalls] callUpdateTravelReportAPI : ", requestURL);

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPutTravelReportData(requestURL, updatedTravelReport);

            if(result.status === 200) {
                console.log('[TravelReportAPICalls] callUpdateTravelReportAPI Result : ', result);
                dispatch({ type: PUT_TRAVEL_REPORT, payload: result });
            }

        } catch (error) {
            console.error('[TravelReportAPICalls] callUpdateTravelReportAPI error : ', error);
        }
    };
};

export const callCreateTravelReportAPI = (createdTravelReport) => {
    console.log('[TravelReportAPICalls] callCreateTravelReportAPI Start');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-report/v1/travel-report`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPostTravelReportData(requestURL, createdTravelReport);

            if(result.status === 200) {
                console.log('[TravelReportAPICalls] callCreateTravelReportAPI Result : ', result);
                dispatch({ type: POST_TRAVEL_REPORT, payload: result });
            }

        } catch (error) {
            console.error('[TravelReportAPICalls] callUpdateTravelReportAPI error : ', error);
        }
    };
};

export const callDeleteTravelReportAPI = (reportCode, deletedTravelReport) => {
    console.log('[TravelReportAPICalls] callDeleteTravelReport', deletedTravelReport);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-report/v1/travel-report/${reportCode}`;
    console.log("[TravelReportAPICalls] callDeleteTravelReportAPI : ", requestURL);

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPutTravelReportData(requestURL, deletedTravelReport);

            if(result.status === 200) {
                console.log('[TravelReportAPICalls] callDeleteTravelReportAPI Result : ', result);
                dispatch({ type: PUT_TRAVEL_REPORT_DELETION_STATUS, payload: result });
            }

        } catch (error) {
            console.error('[TravelReportAPICalls] callDeleteTravelReportAPI error : ', error);
        }
    };
};

