package travelanchor_server.travelplan.dto;

public class ExpenseDetailDTO {

    private int expenseDetailCode;
    private int expenseCode;
    private int detailAmount;
    private int memberCode;

    public ExpenseDetailDTO() {
    }

    public ExpenseDetailDTO(int expenseDetailCode, int expenseCode, int detailAmount, int memberCode) {
        this.expenseDetailCode = expenseDetailCode;
        this.expenseCode = expenseCode;
        this.detailAmount = detailAmount;
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

    public int getDetailAmount() {
        return detailAmount;
    }

    public void setDetailAmount(int detailAmount) {
        this.detailAmount = detailAmount;
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
                ", detailAmount=" + detailAmount +
                ", memberCode=" + memberCode +
                '}';
    }
}
