package travelanchor_server.member.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public class MemberDTO implements UserDetails {

    private int memberCode;
    private int authorityCode;
    private String memberName;
    private String memberNickName;
    private String memberMobileNumber;
    private LocalDate memberCreatedAt;
    private String memberId;
    private String memberPassword;
    private int memberLevel;
    private String memberCertification;

    public MemberDTO() {
    }

    public MemberDTO(int memberCode, int authorityCode, String memberName, String memberNickName, String memberMobileNumber, LocalDate memberCreatedAt, String memberId, String memberPassword, int memberLevel, String memberCertification) {
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

    @Override
    public String toString() {
        return "MemberDTO{" +
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
                '}';
    }

    private Collection<GrantedAuthority> authorities;

    public void setAuthorities(Collection<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.memberPassword;
    }

    @Override
    public String getUsername() {
        return this.memberId;   // memberName이 아니라 memberId를 사용해야 한다는 것을 주의!
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
