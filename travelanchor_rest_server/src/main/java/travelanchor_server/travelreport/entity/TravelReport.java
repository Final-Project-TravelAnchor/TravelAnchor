package travelanchor_server.travelreport.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_travel_reports")
public class TravelReport {

    @Id
    @Column(name = "report_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "report_title")
    private String reportTitle;

    @Column(name = "report_content")
    private String reportContent;

    @Column(name = "report_start_date")
    private String reportStartDate;

    @Column(name = "report_end_date")
    private String reportEndDate;

    @Column(name = "report_destination")
    private String reportDestination;

    @Column(name = "report_created_at")
    private String reportCreatedAt;

    @Column(name = "report_isdeleted")
    private String reportIsdeleted;

    public TravelReport() {
    }

    public TravelReport(int reportCode, int memberCode, String reportTitle, String reportContent, String reportStartDate, String reportEndDate, String reportDestination, String reportCreatedAt, String reportIsdeleted) {
        this.reportCode = reportCode;
        this.memberCode = memberCode;
        this.reportTitle = reportTitle;
        this.reportContent = reportContent;
        this.reportStartDate = reportStartDate;
        this.reportEndDate = reportEndDate;
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

    public String getReportStartDate() {
        return reportStartDate;
    }

    public void setReportStartDate(String reportStartDate) {
        this.reportStartDate = reportStartDate;
    }

    public String getReportEndDate() {
        return reportEndDate;
    }

    public void setReportEndDate(String reportEndDate) {
        this.reportEndDate = reportEndDate;
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
                ", reportStartDate='" + reportStartDate + '\'' +
                ", reportEndDate='" + reportEndDate + '\'' +
                ", reportDestination='" + reportDestination + '\'' +
                ", reportCreatedAt='" + reportCreatedAt + '\'' +
                ", reportIsdeleted='" + reportIsdeleted + '\'' +
                '}';
    }
}
