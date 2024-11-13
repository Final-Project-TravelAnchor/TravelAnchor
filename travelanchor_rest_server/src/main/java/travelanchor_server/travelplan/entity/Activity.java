package travelanchor_server.travelplan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "tbl_activity")
public class Activity {

    @Id
    @Column(name = "activity_code")
    private int activityCode;

    @Column(name = "day_code")
    private int dayCode;

    @Column(name = "activity_title")
    private String activityTitle;

    @Column(name = "activity_detail")
    private String activityDetail;

    public Activity() {
    }

    public Activity(int activityCode, int dayCode, String activityTitle, String activityDetail) {
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
