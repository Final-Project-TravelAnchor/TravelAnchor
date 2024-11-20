import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callUpdateExpenseDetail, callGetExpenseDetailByCode } from '../../apis/ExpenseAPICalls';
import { useParams, useNavigate } from 'react-router-dom';

const ExpenseUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { expenseDetailCode } = useParams(); // URL에서 세부활동금액 코드 추출
  const expenseDetail = useSelector((state) => state.expenseDetailReducer[0]); // 해당 데이터 가져오기
  const [form, setForm] = useState({
    expenseDetailAmount: '',
    memberCode: '',
  });

  // 데이터 가져오기
  useEffect(() => {
    if (expenseDetailCode) {
      dispatch(callGetExpenseDetailByCode(expenseDetailCode));
    }
  }, [dispatch, expenseDetailCode]);

  // 데이터가 변경되면 폼 업데이트
  useEffect(() => {
    if (expenseDetail) {
      setForm({
        expenseDetailAmount: expenseDetail.expenseDetailAmount,
        memberCode: expenseDetail.memberCode,
      });
    }
  }, [expenseDetail]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 수정 요청 핸들러
  const handleSubmit = async () => {
    if (!form.expenseDetailAmount || !form.memberCode) {
      alert('필수 입력값을 채워주세요.');
      return;
    }

    try {
      await dispatch(callUpdateExpenseDetail({ 
        expenseDetailCode, 
        ...form 
      }));
      alert('수정이 완료되었습니다.');
      navigate('/plans/ExpenseList'); // 수정 후 리스트로 이동
    } catch (error) {
      console.error('수정 중 에러 발생:', error);
      alert('수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>활동금액 수정</h1>
      <div>
        <label>세부활동비용:</label>
        <input
          type="number"
          name="expenseDetailAmount"
          value={form.expenseDetailAmount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>회원식별코드:</label>
        <input
          type="text"
          name="memberCode"
          value={form.memberCode}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit}>수정</button>
      <button onClick={() => navigate('/plans/ExpenseList')}>취소</button>
    </div>
  );
};

export default ExpenseUpdate;
