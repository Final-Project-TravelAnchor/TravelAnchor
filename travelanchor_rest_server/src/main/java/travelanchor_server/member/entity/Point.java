package travelanchor_server.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_point_reward")
public class Point {

    @Id
    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "point_reward_total_count")
    private int pointRewardTotalCount;

    @Column(name = "point_reward_point")
    private int pointRewardPoint;

    public Point() {}

    public Point(int memberCode, int pointRewardTotalCount, int pointRewardPoint) {
        this.memberCode = memberCode;
        this.pointRewardTotalCount = pointRewardTotalCount;
        this.pointRewardPoint = pointRewardPoint;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getPointRewardTotalCount() {
        return pointRewardTotalCount;
    }

    public void setPointRewardTotalCount(int pointRewardTotalCount) {
        this.pointRewardTotalCount = pointRewardTotalCount;
    }

    public int getPointRewardPoint() {
        return pointRewardPoint;
    }

    public void setPointRewardPoint(int pointRewardPoint) {
        this.pointRewardPoint = pointRewardPoint;
    }

    @Override
    public String toString() {
        return "Point{" +
                "memberCode=" + memberCode +
                ", pointRewardTotalCount=" + pointRewardTotalCount +
                ", pointRewardPoint=" + pointRewardPoint +
                '}';
    }

}
