package travelanchor_server.travelplan.dto;

public class ActivityDTO {

    private int activityCode;
    private int dayCode;
    private String activityTitle;
    private String activityDetail;

    public ActivityDTO() {
    }

    public ActivityDTO(int activityCode, int dayCode, String activityTitle, String activityDetail) {
        this.activityCode = activityCode;
        this.dayCode = dayCode;
        this.activityTitle = activityTitle;
        this.activityDetail = activityDetail;
    }

    public int getActivityCode() {
        return activityCode;
    }

    public void setActivityCode(int activityCode) {
        this.activityCode = activityCode;
    }

    public int getDayCode() {
        return dayCode;
    }

    public void setDayCode(int dayCode) {
        this.dayCode = dayCode;
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

    @Override
    public String toString() {
        return "ActivityDTO{" +
                "activityCode=" + activityCode +
                ", dayCode=" + dayCode +
                ", activityTitle='" + activityTitle + '\'' +
                ", activityDetail='" + activityDetail + '\'' +
                '}';
    }
}
