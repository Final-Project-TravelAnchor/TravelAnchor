package travelanchor_server.travelreport.entity;

import jakarta.persistence.*;

import java.util.Date;

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

    @Column(name = "report_destination")
    private String reportDestination;

    @Column(name = "report_theme")
    private String reportTheme;

    @Column(name = "report_created_at")
    private Date reportCreatedAt;

    @Column(name = "report_isdeleted")
    private String reportIsdeleted;

    public TravelReport() {
    }

    public int getReportCode() {return reportCode;}

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
                ", reportTheme='" + reportTheme + '\'' +
                ", reportCreatedAt=" + reportCreatedAt +
                ", reportIsdeleted='" + reportIsdeleted + '\'' +
                '}';
    }
}
