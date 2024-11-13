package travelanchor_server.travelplan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "tbl_expense")
public class Expense {

    @Id
    @Column (name = "expense_code")
    private int expenseCode;

    @Column (name = "activity_code")
    private int activityCode;

    @Column (name = "expense_total_amount")
    private int expenseTotalAmount;

    public Expense() {
    }

    public Expense(int expenseCode, int activityCode, int expenseTotalAmount) {
        this.expenseCode = expenseCode;
        this.activityCode = activityCode;
        this.expenseTotalAmount = expenseTotalAmount;
    }

    public int getExpenseCode() {
        return expenseCode;
    }

    public void setExpenseCode(int expenseCode) {
        this.expenseCode = expenseCode;
    }

    public int getActivityCode() {
        return activityCode;
    }

    public void setActivityCode(int activityCode) {
        this.activityCode = activityCode;
    }

    public int getExpenseTotalAmount() {
        return expenseTotalAmount;
    }

    public void setExpenseTotalAmount(int expenseTotalAmount) {
        this.expenseTotalAmount = expenseTotalAmount;
    }

    @Override
    public String toString() {
        return "ExpenseDTO{" +
                "expenseCode=" + expenseCode +
                ", activityCode=" + activityCode +
                ", expenseTotalAmount=" + expenseTotalAmount +
                '}';
    }
}
