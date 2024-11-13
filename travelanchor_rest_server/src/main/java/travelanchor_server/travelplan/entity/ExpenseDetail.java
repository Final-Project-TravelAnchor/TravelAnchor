package travelanchor_server.travelplan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_expense_detail")
public class ExpenseDetail {

    @Id
    @Column(name = "expense_detail_code")
    private int expenseDetailCode;

    @Column(name = "expense_code")
    private int expenseCode;

    @Column(name = "expense_detail_amount")
    private int expenseDetailAmount;

    @Column(name = "member_code")
    private int memberCode;

    public ExpenseDetail() {
    }

    public ExpenseDetail(int expenseDetailCode, int expenseCode, int expenseDetailAmount, int memberCode) {
        this.expenseDetailCode = expenseDetailCode;
        this.expenseCode = expenseCode;
        this.expenseDetailAmount = expenseDetailAmount;
        this.memberCode = memberCode;
    }

    public int getExpenseDetailCode() {
        return expenseDetailCode;
    }

    public void setExpenseDetailCode(int expenseDetailCode) {
        this.expenseDetailCode = expenseDetailCode;
    }

    public int getExpenseCode() {
        return expenseCode;
    }

    public void setExpenseCode(int expenseCode) {
        this.expenseCode = expenseCode;
    }

    public int getExpenseDetailAmount() {
        return expenseDetailAmount;
    }

    public void setExpenseDetailAmount(int expenseDetailAmount) {
        this.expenseDetailAmount = expenseDetailAmount;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    @Override
    public String toString() {
        return "ExpenseDetailDTO{" +
                "expenseDetailCode=" + expenseDetailCode +
                ", expenseCode=" + expenseCode +
                ", expenseDetailAmount=" + expenseDetailAmount +
                ", memberCode=" + memberCode +
                '}';
    }
}
