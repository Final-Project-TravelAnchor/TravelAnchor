package travelanchor_server.travelreport.dto;

import java.util.Date;

public class TravelReportDTO {

    private int reportCode;
    private int memberCode;
    private String reportTitle;
    private String reportContent;
    private String reportDestination;
    private String reportTheme;
    private Date reportCreatedAt;

    public TravelReportDTO() {
    }

    public TravelReportDTO(int reportCode, int memberCode, String reportTitle, String reportContent, String reportDestination, String reportTheme, Date reportCreatedAt) {
        this.reportCode = reportCode;
        this.memberCode = memberCode;
        this.reportTitle = reportTitle;
        this.reportContent = reportContent;
        this.reportDestination = reportDestination;
        this.reportTheme = reportTheme;
        this.reportCreatedAt = reportCreatedAt;
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

    public String getReportTheme() {
        return reportTheme;
    }

    public void setReportTheme(String reportTheme) {
        this.reportTheme = reportTheme;
    }

    public Date getReportCreatedAt() {
        return reportCreatedAt;
    }

    public void setReportCreatedAt(Date reportCreatedAt) {
        this.reportCreatedAt = reportCreatedAt;
    }

    @Override
    public String toString() {
        return "TravelReportDTO{" +
                "reportCode=" + reportCode +
                ", memberCode=" + memberCode +
                ", reportTitle='" + reportTitle + '\'' +
                ", reportContent='" + reportContent + '\'' +
                ", reportDestination='" + reportDestination + '\'' +
                ", reportTheme='" + reportTheme + '\'' +
                ", reportCreatedAt=" + reportCreatedAt +
                '}';
    }
}
