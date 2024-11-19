import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetExpenseDetail, callGetExpenseDetailByCode } from '../../apis/ExpenseAPICalls';

const ExpenseDetailList = () => {
  const dispatch = useDispatch();
  const expenseDetails = useSelector((state) => state.expenseDetailReducer);
  const [isListVisible, setIsListVisible] = useState(false);
  const [searchCode, setSearchCode] = useState(''); // 검색할 코드
  const [singleDetail, setSingleDetail] = useState(null); // 개별 검색 결과

  // 전체 리스트 조회
  const handleFetchList = () => {
    dispatch(callGetExpenseDetail());
    setIsListVisible(true);
    setSingleDetail(null); // 이전 검색 결과 초기화
  };

  // 개별 코드로 검색
  const handleSearchByCode = async () => {
    if (!searchCode.trim()) {
      alert('코드를 입력해주세요.');
      return;
    }
    try {
      await dispatch(callGetExpenseDetailByCode(searchCode));
      setSingleDetail(expenseDetails[0]); // 검색 결과 저장
      setIsListVisible(false); // 전체 리스트 숨김
    } catch (error) {
      console.error('검색 중 에러 발생:', error);
      alert('검색 결과를 가져오는 데 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>세부활동금액 관리</h1>

      {/* 전체 조회 버튼 */}
      <button onClick={handleFetchList}>전체 조회</button>

      {/* 개별 검색 */}
      <div>
        <input
          type="text"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          placeholder="활동금액세부코드 입력"
        />
        <button onClick={handleSearchByCode}>코드로 검색</button>
      </div>

      {/* 전체 리스트 표시 */}
      {isListVisible && Array.isArray(expenseDetails) && expenseDetails.length > 0 && (
        <ul>
          {expenseDetails.map((detail) => (
            <li key={detail.expenseDetailCode}>
              활동금액세부코드: {detail.expenseDetailCode}, 활동금액코드: {detail.expenseCode}, 세부활동비용: {detail.expenseDetailAmount}, 회원식별코드: {detail.memberCode}
            </li>
          ))}
        </ul>
      )}

      {/* 개별 검색 결과 표시 */}
      {singleDetail && (
        <div>
          <h2>검색 결과:</h2>
          <p>
            활동금액세부코드: {singleDetail.expenseDetailCode}, 활동금액코드: {singleDetail.expenseCode}, 세부활동비용: {singleDetail.expenseDetailAmount}, 회원식별코드: {singleDetail.memberCode}
          </p>
        </div>
      )}

      {/* 데이터 없을 때 메시지 */}
      {!isListVisible && !singleDetail && <p>데이터가 없습니다.</p>}
    </div>
  );
};

export default ExpenseDetailList;
