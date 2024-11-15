package travelanchor_server.travelplan.dto;

public class ExpenseDetailDTO {

    private int expenseDetailCode;
    private int expenseCode;
    private int expenseDetailAmount;
    private int memberCode;

    public ExpenseDetailDTO() {
    }

    public ExpenseDetailDTO(int expenseDetailCode, int expenseCode, int expenseDetailAmount, int memberCode) {
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
