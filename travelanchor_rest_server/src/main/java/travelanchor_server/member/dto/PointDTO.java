package travelanchor_server.member.dto;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.member.entity.Point;

public class PointDTO {

    private int memberCode;
    private int pointRewardTotalCount;
    private int pointRewardPoint;

    public PointDTO() {}

    public PointDTO(int memberCode, int pointRewardTotalCount, int pointRewardPoint) {
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
        return "PointDTO{" +
                "memberCode=" + memberCode +
                ", pointRewardTotalCount=" + pointRewardTotalCount +
                ", pointRewardPoint=" + pointRewardPoint +
                '}';
    }
}
