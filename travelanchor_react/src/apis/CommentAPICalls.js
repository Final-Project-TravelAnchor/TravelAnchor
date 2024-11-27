import {
	GET_COMMENT,
	PUT_COMMENT,
	POST_COMMENT,
	DEL_COMMENT,
} from "../modules/CommentModule";

export const fetchGetData = async (requestURL) => {
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
        console.error('Error fetching notice data:', error);
        throw error;
    }
};

export const fetchPutData = async (requestURL, updatedComment) => {

    console.log('Fetching comment data url: ', requestURL);
    console.log('Fetching comment data' , updatedComment);

    try {
        const response = await fetch(requestURL, {
            method: 'PUT',
            headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(updatedComment)
        }).then((response) => response.json());

        console.log('[CommentAPICalls] fetchPutCommentData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching comment data:', error);
        throw error;
    }
};

export const fetchPostData = async (requestURL, createdComment) => {

    console.log('Fetching comment url: ', requestURL);
    console.log('Fetching comment data' , createdComment);

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
			},
            body: JSON.stringify(createdComment)
        }).then((response) => response.json());

        console.log('[CommentAPICalls] fetchPostCommentData RESULT : ', response);

        return response;
    } catch (error) {
        console.error('Error fetching comment data:', error);
        throw error;
    }
};

const fetchDelData = async (requestURL, deletedComment) => {

    console.log('Fetching comment data url: ', requestURL);

    try {
        const response = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(deletedComment),
        });

        // 응답 상태 확인
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // JSON 데이터 파싱
        const result = await response.json();

        console.log('[CommentAPICalls] fetchDeleteCommentData RESULT: ', result);
        return result;

    } catch (error) {
        console.error('Error fetching comment data:', error);
        throw error; // 호출 측에서 에러 처리를 할 수 있도록 재던짐
    }
};

// 댓글 전체리스트
export const callCommentAPI = () => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/comment/v1/comment`
	
	return async (dispatch, getState) => {
		try {
			const result = await fetchGetData(requestURL);
	
			if(result.status === 200) {
				console.log('[commentAPICalls] callCommnetAPI Result : ', result);
				dispatch({ type: GET_COMMENT, payload: result.data });
			}
		} catch (error) {
            console.error('[CommentAPICalls] callNoticeListAPI Error : ', error);
		}
	};
};

// 댓글 수정
export const callUpdateCommentAPI = (commentCode, updatedComment) => {
    console.log('[CommentAPICalls] callUpdateCommentAPI', updatedComment);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/comment/v1/comment/${commentCode}`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPutData(requestURL, updatedComment);

            if(result.status === 200) {
                console.log('[CommentAPICalls] callUpdateCommentAPI Result : ', result);
                dispatch({ type: PUT_COMMENT, payload: result });
            }

        } catch (error) {
            console.error('[CommentAPICalls] callUpdateCommentAPI error : ', error);
        }
    };
};

// 댓글 등록
export const callCreateCommentAPI = (createdComment) => {
    console.log('[CommentAPICalls] callCreateCommentAPI Start');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/comment/v1/comment`;
    console.log('[CommentAPICalls] callCreateCommentAPI : ', createdComment);

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchPostData(requestURL, createdComment);

            if(result.status === 200) {
                console.log('[CommentAPICalls] callCreateCommentAPI Result : ', result);
                dispatch({ type: POST_COMMENT, payload: result });
            }

        } catch (error) {
            console.error('[CommentAPICalls] callCreateCommentAPI error : ', error);
        }
    };
};

// 댓글 삭제(완전삭제)
export const callDeleteCommentAPI = (commentCode, deletedComment) => {
    console.log('[CommentAPICalls] callDeleteCommnetAPI Start');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/comment/v1/comment/${commentCode}`;

    return async (dispatch, getState) => {
        try {
            
            const result = await fetchDelData(requestURL, deletedComment);

            if(result.status === 200) {
                console.log('[CommentAPICalls] callDeleteCommentAPI Result : ', result);
                dispatch({ type: DEL_COMMENT, payload: result });
            }

        } catch (error) {
            console.error('[CommentAPICalls] callDeleteCommentAPI error : ', error);
        }
    };
};