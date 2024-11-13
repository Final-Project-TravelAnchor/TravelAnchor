package travelanchor_server.travelplan.dto;

public class ExpenseDTO {

    private int expenseCode;
    private int activityCode;
    private int expenseTotalAmount;

    public ExpenseDTO() {
    }

    public ExpenseDTO(int expenseCode, int activityCode, int expenseTotalAmount) {
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
