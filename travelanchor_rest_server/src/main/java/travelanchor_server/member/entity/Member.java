package travelanchor_server.member.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "tbl_member")
public class Member {

    @Id
    @Column(name = "member_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberCode;

    @Column(name = "authority_code")
    private int authorityCode;

    @Column(name = "member_name")
    private String memberName;

    @Column(name = "member_nickname")
    private String memberNickName;

    @Column(name = "member_mobile_number")
    private String memberMobileNumber;

    @Column(name = "member_created_at")
    private LocalDate memberCreatedAt;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "member_password")
    private String memberPassword;

    @Column(name = "member_level")
    private int memberLevel;

    @Column(name = "member_certification")
    private String memberCertification;

    @Column(name = "profile_photo")
    private String profilePhoto;

    @OneToMany
    @JoinColumn(name = "member_code")
    private List<MemberRole> memberRole;

    public Member() {
    }

    public Member(int memberCode, int authorityCode, String memberName, String memberNickName, String memberMobileNumber, LocalDate memberCreatedAt, String memberId, String memberPassword, int memberLevel, String memberCertification, String profilePhoto, List<MemberRole> memberRole) {
        this.memberCode = memberCode;
        this.authorityCode = authorityCode;
        this.memberName = memberName;
        this.memberNickName = memberNickName;
        this.memberMobileNumber = memberMobileNumber;
        this.memberCreatedAt = memberCreatedAt;
        this.memberId = memberId;
        this.memberPassword = memberPassword;
        this.memberLevel = memberLevel;
        this.memberCertification = memberCertification;
        this.profilePhoto = profilePhoto;
        this.memberRole = memberRole;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(int authorityCode) {
        this.authorityCode = authorityCode;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberNickName() {
        return memberNickName;
    }

    public void setMemberNickName(String memberNickName) {
        this.memberNickName = memberNickName;
    }

    public String getMemberMobileNumber() {
        return memberMobileNumber;
    }

    public void setMemberMobileNumber(String memberMobileNumber) {
        this.memberMobileNumber = memberMobileNumber;
    }

    public LocalDate getMemberCreatedAt() {
        return memberCreatedAt;
    }

    public void setMemberCreatedAt(LocalDate memberCreatedAt) {
        this.memberCreatedAt = memberCreatedAt;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getMemberPassword() {
        return memberPassword;
    }

    public void setMemberPassword(String memberPassword) {
        this.memberPassword = memberPassword;
    }

    public int getMemberLevel() {
        return memberLevel;
    }

    public void setMemberLevel(int memberLevel) {
        this.memberLevel = memberLevel;
    }

    public String getMemberCertification() {
        return memberCertification;
    }

    public void setMemberCertification(String memberCertification) {
        this.memberCertification = memberCertification;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public List<MemberRole> getMemberRole() {
        return memberRole;
    }

    public void setMemberRole(List<MemberRole> memberRole) {
        this.memberRole = memberRole;
    }

    @Override
    public String toString() {
        return "Member{" +
                "memberCode=" + memberCode +
                ", authorityCode=" + authorityCode +
                ", memberName='" + memberName + '\'' +
                ", memberNickName='" + memberNickName + '\'' +
                ", memberMobileNumber='" + memberMobileNumber + '\'' +
                ", memberCreatedAt=" + memberCreatedAt +
                ", memberId='" + memberId + '\'' +
                ", memberPassword='" + memberPassword + '\'' +
                ", memberLevel=" + memberLevel +
                ", memberCertification='" + memberCertification + '\'' +
                ", profilePhoto='" + profilePhoto + '\'' +
                ", memberRole=" + memberRole +
                '}';
    }
}
