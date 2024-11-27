package travelanchor_server.travelplan.entity;

import jakarta.persistence.*;

@Entity
@Table (name = "tbl_expense")
public class Expense {

    @Id
    @Column (name = "expense_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int expenseCode;

    @Column (name = "activity_code")
    private int activityCode;

    @Column (name = "travel_code")
    private int travelCode;

    @Column (name = "expense_total_amount")
    private int expenseTotalAmount;

    public Expense() {
    }

    public Expense(int expenseCode, int activityCode, int travelCode, int expenseTotalAmount) {
        this.expenseCode = expenseCode;
        this.activityCode = activityCode;
        this.travelCode = travelCode;
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

    public int getTravelCode() {
        return travelCode;
    }

    public void setTravelCode(int travelCode) {
        this.travelCode = travelCode;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "expenseCode=" + expenseCode +
                ", activityCode=" + activityCode +
                ", travelCode=" + travelCode +
                ", expenseTotalAmount=" + expenseTotalAmount +
                '}';
    }

}
