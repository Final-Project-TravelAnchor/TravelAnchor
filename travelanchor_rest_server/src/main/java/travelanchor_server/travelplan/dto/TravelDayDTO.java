package travelanchor_server.travelplan.dto;

public class TravelDayDTO {

    private int dayCode;
    private int travelCode;
    private int dayNumber;
    private int dayDate;

    private String activityTitle;
    private String activityDetail;

    public TravelDayDTO() {
    }

    public TravelDayDTO(int dayCode, int travelCode, int dayNumber, int dayDate, String activityTitle, String activityDetail) {
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
        return "TravelDayDTO{" +
                "dayCode=" + dayCode +
                ", travelCode=" + travelCode +
                ", dayNumber=" + dayNumber +
                ", dayDate=" + dayDate +
                ", activityTitle='" + activityTitle + '\'' +
                ", activityDetail='" + activityDetail + '\'' +
                '}';
    }
}
