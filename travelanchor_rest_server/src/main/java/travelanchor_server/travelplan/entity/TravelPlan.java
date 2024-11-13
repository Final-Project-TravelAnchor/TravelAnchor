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
    private Date travelStartDate;

    @Column(name = "travel_end_date")
    private Date travelEndDate;

    @Column(name = "travel_total_date")
    private String travelTotalDate;

    @Column(name = "travel_total_night")
    private String travelTotalNight;

    @Column(name = "travel_destination")
    private String travelDestination;

    @Column(name = "travel_onoff")
    private Boolean travelOnoff;

    public TravelPlan() {
    }

    public TravelPlan(int travelCode, int memberCode, String travelName, Date travelStartDate, Date travelEndDate, String travelTotalDate, String travelTotalNight, String travelDestination, Boolean travelOnoff) {
        this.travelCode = travelCode;
        this.memberCode = memberCode;
        this.travelName = travelName;
        this.travelStartDate = travelStartDate;
        this.travelEndDate = travelEndDate;
        this.travelTotalDate = travelTotalDate;
        this.travelTotalNight = travelTotalNight;
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

    public String getTravelTotalNight() {
        return travelTotalNight;
    }

    public void setTravelTotalNight(String travelTotalNight) {
        this.travelTotalNight = travelTotalNight;
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
                ", travelTotalNight=" + travelTotalNight +
                ", travelDestination='" + travelDestination + '\'' +
                ", travelOnoff=" + travelOnoff +
                '}';
    }
}
