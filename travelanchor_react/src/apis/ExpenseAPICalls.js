import { 
	GET_EXPENSE_DETAIL,
	GET_EXPENSE_DETAIL_BY_CODE, 
	POST_EXPENSE_DETAIL, 
	PUT_EXPENSE_DETAIL 
} from '../modules/ExpenseDetailModule';

// 비동기 API 

const fetchGetExpenseDetail = async(requestURL) => {
  try{
    const response = await fetch(requestURL, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        Accept: '*/*'
      }
    });
    const result = await response.json();

    return result;
  }catch(error){
    throw error;
  }
};


const fetchPutExpenseDetail = async(requestURL, UpdateExpenseDetail) => {
      try{
		const response = await fetch(requestURL, {
			method: 'PUT',
            headers: {
				Accept: '*/*',
                'Content-Type': 'application/json',
			},
			body: JSON.stringify(UpdateExpenseDetail)
		}).then((response) => response.json());

		return response;
	  } catch(error) {
			throw error;
	  }
};

const fetchPostExpenseDetail = async(requestURL, InsertExpenseDetail) => {
	try{
	  const response = await fetch(requestURL, {
		  method: 'POST',
		  headers: {
			  Accept: '*/*',
			  'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(InsertExpenseDetail)
	  }).then((response) => response.json());

	  return response;
	} catch(error) {
		  throw error;
	}
};





// v1 사용

// 세부활동금액 목록 조회
export const callGetExpenseDetail =  () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan/expenseDetail`;

  return async(dispatch, getState) => {

    try{
      const result = await fetchGetExpenseDetail(requestURL);
      
      if(result.status === 200) {
        dispatch({ type:GET_EXPENSE_DETAIL, payload: result.data});
      }
    
    } catch(error) {
      console.error('[ExpenseAPICalls] callGetExpenseDetail error',error);
    }

  };

}

// 세부활동금액 코드로 조회
export const callGetExpenseDetailByCode = (expenseDetailCode) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan/expenseDetail/${expenseDetailCode}`;

  return async(dispatch,getState) => {

    try {

      const result = await fetchGetExpenseDetail(requestURL);

      if(result.status === 200) {

        dispatch({ type: GET_EXPENSE_DETAIL, payload: result.data});
      }

    }catch(error){
      console.error('[ExpenseAPICalls] callGetExpenseDetailByCode error',error);
    }
  };
};



// 세부활동금액 수정
export const callUpdateExpenseDetail = (UpdateExpenseDetail) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan/expenseDetail/${UpdateExpenseDetail.expenseDetailCode}`;

  return async(dispatch, getState) => {
    try{

      const result = await fetchPutExpenseDetail(requestURL, UpdateExpenseDetail);

      if(result.status === 200 ) {
        dispatch({ type: PUT_EXPENSE_DETAIL, payload: result});
      }

    }catch(error){
      console.error('[ExpenseAPICalls] callUpdateExpenseDetail error',error);
    }
  };

};

// 세부활동금액 등록
export const callInsertExpenseDetail =  (InsertExpenseDetail) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/travel-plan/v1/travel-plan/expenseDetail`;
  
	return async (dispatch, getState) => {
	  try {
   
		const result = await fetchPostExpenseDetail(requestURL,InsertExpenseDetail);
  
		if(result.status === 200) {
		  dispatch({ type:POST_EXPENSE_DETAIL, payload: result});
		}
	  }catch(error){
		console.error('[ExpenseAPICalls] callInsertExpenseDetail error',error);
	  }
	};
  };

// // 세부활동금액 삭제
// export const deleteExpenseDetail = async (expenseDetailCode, memberDTO) => {
//   const requestURL = `${BASE_URL}/travel-plan/expenseDetail/${expenseDetailCode}`;

//   const response = await fetch(requestURL, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: '*/*',
//     },
//     body: JSON.stringify(memberDTO), // 삭제할 때 필요한 데이터(예: 회원 정보)를 본문에 담기
//   });

//   const result = await response.json();
//   return result;
// };
