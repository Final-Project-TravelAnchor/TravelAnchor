package travelanchor_server.travelplan.dto;

public class ExpenseDTO {

    private int expenseCode;
    private int activityCode;
    private int expenseTotalAmount;
    private int travel_code;

    public ExpenseDTO() {
    }

    public ExpenseDTO(int expenseCode, int activityCode, int expenseTotalAmount, int travel_code) {
        this.expenseCode = expenseCode;
        this.activityCode = activityCode;
        this.expenseTotalAmount = expenseTotalAmount;
        this.travel_code = travel_code;
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

    public int getTravel_code() {
        return travel_code;
    }

    public void setTravel_code(int travel_code) {
        this.travel_code = travel_code;
    }

    @Override
    public String toString() {
        return "ExpenseDTO{" +
                "expenseCode=" + expenseCode +
                ", activityCode=" + activityCode +
                ", expenseTotalAmount=" + expenseTotalAmount +
                ", travel_code=" + travel_code +
                '}';
    }
}
