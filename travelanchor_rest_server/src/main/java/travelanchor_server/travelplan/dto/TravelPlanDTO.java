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
    private Boolean travelOnoff;

    public TravelPlanDTO() {
    }

    public TravelPlanDTO(int travelCode, int memberCode, String travelName, Date travelStartDate, Date travelEndDate, String travelTotalDate, String travelDestination, Boolean travelOnoff) {
        this.travelCode = travelCode;
        this.memberCode = memberCode;
        this.travelName = travelName;
        this.travelStartDate = travelStartDate;
        this.travelEndDate = travelEndDate;
        this.travelTotalDate = travelTotalDate;
        this.travelDestination = travelDestination;
        this.travelOnoff = travelOnoff;
    }

    public int getTravelCode() {
        return travelCode;
    }

    public void setTravelCode(int travelCode) {
        this.travelCode = travelCode;
    }

    public int getMembercode() {
        return memberCode;
    }

    public void setMembercode(int memberCode) {
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

    public Boolean getTravelOnoff() {
        return travelOnoff;
    }

    public void setTravelOnoff(Boolean travelOnoff) {
        this.travelOnoff = travelOnoff;
    }

    @Override
    public String toString() {
        return "TravelPlanDTO{" +
                "travelCode=" + travelCode +
                ", memberCode=" + memberCode +
                ", travelName='" + travelName + '\'' +
                ", travelStartDate=" + travelStartDate +
                ", travelEndDate=" + travelEndDate +
                ", travelTotalDate=" + travelTotalDate +
                ", travelDestination='" + travelDestination + '\'' +
                ", travelOnoff=" + travelOnoff +
                '}';
    }
}
