import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callInsertExpenseDetail } from '../../apis/ExpenseAPICalls';
import { useNavigate } from 'react-router-dom';

const ExpenseInsert = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 입력 폼 상태 관리
  const [form, setForm] = useState({
    expenseDetailAmount: '',
    memberCode: '',
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 등록 버튼 클릭 핸들러
  const handleSubmit = async () => {
    // 필수값 검증
    if (!form.expenseDetailAmount || !form.memberCode) {
      alert('모든 필수 입력값을 채워주세요.');
      return;
    }

    try {
      // Redux 액션 호출
      await dispatch(callInsertExpenseDetail(form));
      alert('활동금액이 성공적으로 등록되었습니다.');
      navigate('/plans/ExpenseList'); // 등록 후 리스트 페이지로 이동
    } catch (error) {
      console.error('등록 중 에러 발생:', error);
      alert('등록에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>활동금액 등록</h1>
      <div>
        <label>세부활동비용:</label>
        <input
          type="number"
          name="expenseDetailAmount"
          value={form.expenseDetailAmount}
          onChange={handleChange}
          placeholder="세부활동비용 입력"
        />
      </div>
      <div>
        <label>회원식별코드:</label>
        <input
          type="text"
          name="memberCode"
          value={form.memberCode}
          onChange={handleChange}
          placeholder="회원식별코드 입력"
        />
      </div>
      <button onClick={handleSubmit}>등록</button>
      <button onClick={() => navigate('/plans/ExpenseList')}>취소</button>
    </div>
  );
};

export default ExpenseInsert;
