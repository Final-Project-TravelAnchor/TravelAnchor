package travelanchor_server.travelplan.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tbl_travel_plans")
public class TravelPlan {

    @Id
    @Column(name = "travel_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int travelCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "travel_name")
    private String travelName;

    @Column(name = "travel_start_date")
    private String travelStartDate;

    @Column(name = "travel_end_date")
    private String travelEndDate;

    @Column(name = "travel_total_date")
    private String travelTotalDate;

    @Column(name = "travel_destination")
    private String travelDestination;

    @Column(name = "travel_onoff")
    private String travelOnoff;

    @Column(name ="travel_isdeleted")
    private String travelIsdeleted;

    public TravelPlan() {
    }

    public TravelPlan(int travelCode, int memberCode, String travelName, String travelStartDate, String travelEndDate, String travelTotalDate, String travelDestination, String travelOnoff, String travelIsdeleted) {
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

    public String getTravelStartDate() {
        return travelStartDate;
    }

    public void setTravelStartDate(String travelStartDate) {
        this.travelStartDate = travelStartDate;
    }

    public String getTravelEndDate() {
        return travelEndDate;
    }

    public void setTravelEndDate(String travelEndDate) {
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

