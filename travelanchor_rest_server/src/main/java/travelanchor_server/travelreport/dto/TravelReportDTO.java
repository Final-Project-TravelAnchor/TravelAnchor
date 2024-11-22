package travelanchor_server.travelreport.dto;

public class TravelReportDTO {

    private int reportCode;
    private int memberCode;
    private String reportTitle;
    private String reportContent;
    private String reportDestination;
    private String reportCreatedAt;
    private String reportIsdeleted;

    public TravelReportDTO() {
    }

    public TravelReportDTO(int reportCode, int memberCode, String reportTitle, String reportContent, String reportDestination, String reportCreatedAt, String reportIsdeleted) {
        this.reportCode = reportCode;
        this.memberCode = memberCode;
        this.reportTitle = reportTitle;
        this.reportContent = reportContent;
        this.reportDestination = reportDestination;
        this.reportCreatedAt = reportCreatedAt;
        this.reportIsdeleted = reportIsdeleted;
    }

    public int getReportCode() {
        return reportCode;
    }

    public void setReportCode(int reportCode) {
        this.reportCode = reportCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getReportTitle() {
        return reportTitle;
    }

    public void setReportTitle(String reportTitle) {
        this.reportTitle = reportTitle;
    }

    public String getReportContent() {
        return reportContent;
    }

    public void setReportContent(String reportContent) {
        this.reportContent = reportContent;
    }

    public String getReportDestination() {
        return reportDestination;
    }

    public void setReportDestination(String reportDestination) {
        this.reportDestination = reportDestination;
    }

    public String getReportCreatedAt() {
        return reportCreatedAt;
    }

    public void setReportCreatedAt(String reportCreatedAt) {
        this.reportCreatedAt = reportCreatedAt;
    }

    public String getReportIsdeleted() {
        return reportIsdeleted;
    }

    public void setReportIsdeleted(String reportIsdeleted) {
        this.reportIsdeleted = reportIsdeleted;
    }

    @Override
    public String toString() {
        return "TravelReportDTO{" +
                "reportCode=" + reportCode +
                ", memberCode=" + memberCode +
                ", reportTitle='" + reportTitle + '\'' +
                ", reportContent='" + reportContent + '\'' +
                ", reportDestination='" + reportDestination + '\'' +
                ", reportCreatedAt=" + reportCreatedAt +
                ", reportIsdeleted='" + reportIsdeleted + '\'' +
                '}';
    }
}
