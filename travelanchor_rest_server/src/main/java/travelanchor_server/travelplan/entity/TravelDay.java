package travelanchor_server.travelplan.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_travel_day")
public class TravelDay {

    @Id
    @Column(name = "day_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dayCode;

    @Column(name = "travel_code")
    private int travelCode;

    @Column(name = "day_number")
    private int dayNumber;

    @Column(name = "day_date")
    private int dayDate;

    @Column(name = "activity_title")
    private String activityTitle;

    @Column(name = "activity_detail")
    private String activityDetail;

    public TravelDay() {
    }

    public TravelDay(int dayCode, int travelCode, int dayNumber, int dayDate, String activityTitle, String activityDetail) {
        this.dayCode = dayCode;
        this.travelCode = travelCode;
        this.dayNumber = dayNumber;
        this.dayDate = dayDate;
        this.activityTitle = activityTitle;
        this.activityDetail = activityDetail;
    }

    public String getActivityTitle() {
        return activityTitle;
    }

    public void setActivityTitle(String activityTitle) {
        this.activityTitle = activityTitle;
    }

    public String getActivityDetail() {
        return activityDetail;
    }

    public void setActivityDetail(String activityDetail) {
        this.activityDetail = activityDetail;
    }

    public int getDayCode() {
        return dayCode;
    }

    public void setDayCode(int dayCode) {
        this.dayCode = dayCode;
    }

    public int getTravelCode() {
        return travelCode;
    }

    public void setTravelCode(int travelCode) {
        this.travelCode = travelCode;
    }

    public int getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(int dayNumber) {
        this.dayNumber = dayNumber;
    }

    public int getDayDate() {
        return dayDate;
    }

    public void setDayDate(int dayDate) {
        this.dayDate = dayDate;
    }

    @Override
    public String toString() {
        return "TravelDay{" +
                "dayCode=" + dayCode +
                ", travelCode=" + travelCode +
                ", dayNumber=" + dayNumber +
                ", dayDate=" + dayDate +
                ", activityTitle='" + activityTitle + '\'' +
                ", activityDetail='" + activityDetail + '\'' +
                '}';
    }
}
