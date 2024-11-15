package travelanchor_server.travelplan.dto;

import java.util.Date;

public class TravelPlanDTO {
    private int travelCode;
    private int memberCode;
    private String travelName;
    private Date travelStartDate;
    private Date travelEndDate;
    private String travelTotalDate;
    private String travelDestination;
    private String travelOnoff;
    private String travelIsdeleted;

    public TravelPlanDTO() {
    }

    public TravelPlanDTO(int travelCode, int memberCode, String travelName, Date travelStartDate, Date travelEndDate, String travelTotalDate, String travelDestination, String travelOnoff, String travelIsdeleted) {
        this.travelCode = travelCode;
        this.memberCode = memberCode;
        this.travelName = travelName;
        this.travelStartDate = travelStartDate;
        this.travelEndDate = travelEndDate;
        this.travelTotalDate = travelTotalDate;
        this.travelDestination = travelDestination;
        this.travelOnoff = travelOnoff;
        this.travelIsdeleted = travelIsdeleted;
    }

    public int getTravelCode() {
        return travelCode;
    }

    public void setTravelCode(int travelCode) {
        this.travelCode = travelCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getTravelName() {
        return travelName;
    }

    public void setTravelName(String travelName) {
        this.travelName = travelName;
    }

    public Date getTravelStartDate() {
        return travelStartDate;
    }

    public void setTravelStartDate(Date travelStartDate) {
        this.travelStartDate = travelStartDate;
    }

    public Date getTravelEndDate() {
        return travelEndDate;
    }

    public void setTravelEndDate(Date travelEndDate) {
        this.travelEndDate = travelEndDate;
    }

    public String getTravelTotalDate() {
        return travelTotalDate;
    }

    public void setTravelTotalDate(String travelTotalDate) {
        this.travelTotalDate = travelTotalDate;
    }

    public String getTravelDestination() {
        return travelDestination;
    }

    public void setTravelDestination(String travelDestination) {
        this.travelDestination = travelDestination;
    }

    public String getTravelOnoff() {
        return travelOnoff;
    }

    public void setTravelOnoff(String travelOnoff) {
        this.travelOnoff = travelOnoff;
    }

    public String getTravelIsdeleted() {
        return travelIsdeleted;
    }

    public void setTravelIsdeleted(String travelIsdeleted) {
        this.travelIsdeleted = travelIsdeleted;
    }

    @Override
    public String toString() {
        return "TravelPlanDTO{" +
                "travelCode=" + travelCode +
                ", memberCode=" + memberCode +
                ", travelName='" + travelName + '\'' +
                ", travelStartDate=" + travelStartDate +
                ", travelEndDate=" + travelEndDate +
                ", travelTotalDate='" + travelTotalDate + '\'' +
                ", travelDestination='" + travelDestination + '\'' +
                ", travelOnoff=" + travelOnoff +
                ", travelIsdeleted=" + travelIsdeleted +
                '}';
    }
}
