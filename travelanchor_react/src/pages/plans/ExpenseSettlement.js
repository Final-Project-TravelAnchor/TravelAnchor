import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetExpenseDetail } from '../../apis/ExpenseAPICalls';

const ExpenseSettlement = () => {
  const dispatch = useDispatch();
  const expenseDetails = useSelector((state) => state.expenseDetailReducer);
  const [settlement, setSettlement] = useState([]);
  
  

  useEffect(() => {
    dispatch(callGetExpenseDetail());
  }, [dispatch]);

  const calculateSettlement = () => {
    if (!expenseDetails || expenseDetails.length === 0) {
      alert("정산할 데이터가 없습니다.");
      return;
    }

    // 총 사용 금액 계산
    const totalAmount = expenseDetails.reduce((sum, detail) => sum + detail.expenseDetailAmount, 0);
    

    // 인원수 구하기
    const uniqueMembers = [...new Set(expenseDetails.map((detail) => detail.memberCode))];
    const memberCount = uniqueMembers.length;

    // 1인당 분담금 계산
    const perPersonShare = totalAmount / memberCount;
    

    // 각 멤버의 지불 금액 계산
    const memberExpenses = uniqueMembers.map((memberCode) => {
      const paidAmount = expenseDetails
        .filter((detail) => detail.memberCode === memberCode)
        .reduce((sum, detail) => sum + detail.expenseDetailAmount, 0);

      return {
        memberCode,
        paidAmount,
        balance: paidAmount - perPersonShare, // 정산 결과
      };
    });

    setSettlement(memberExpenses);
  };

  return (
    <div>
      <h1>여행 정산</h1>
      <button onClick={calculateSettlement}>1/N 정산하기</button>

      {settlement.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>회원 코드</th>
              <th>지불한 금액</th>
              <th>1인당 분담금</th>
              <th>정산 결과</th>
            </tr>
          </thead>
          <tbody>
            {settlement.map((result) => (
              <tr key={result.memberCode}>
                <td>{result.memberCode}</td>
                <td>{result.paidAmount.toLocaleString()}원</td>
                <td>{(result.paidAmount - result.balance).toLocaleString()}원</td>
                <td>
                  {result.balance > 0
                    ? `+${result.balance.toLocaleString()}원 (받을 금액)`
                    : `${result.balance.toLocaleString()}원 (지불할 금액)`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {settlement.length === 0 && <p>정산 결과가 없습니다. 정산 버튼을 눌러주세요.</p>}
    </div>
  );
};

export default ExpenseSettlement;
