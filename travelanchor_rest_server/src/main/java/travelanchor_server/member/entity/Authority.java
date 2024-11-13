package travelanchor_server.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_authority")
public class Authority {
    @Id
    @Column(name = "authority_code")
    private int authorityCode;

    @Column(name = "authority_name")
    private String authorityName;

    @Column(name = "authority_desc")
    private String authorityDesc;

    public Authority() {
    }

    public Authority(int authorityCode, String authorityName, String authorityDesc) {
        this.authorityCode = authorityCode;
        this.authorityName = authorityName;
        this.authorityDesc = authorityDesc;
    }

    public int getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(int authorityCode) {
        this.authorityCode = authorityCode;
    }

    public String getAuthorityName() {
        return authorityName;
    }

    public void setAuthorityName(String authorityName) {
        this.authorityName = authorityName;
    }

    public String getAuthorityDesc() {
        return authorityDesc;
    }

    public void setAuthorityDesc(String authorityDesc) {
        this.authorityDesc = authorityDesc;
    }

    @Override
    public String toString() {
        return "Authority{" +
                "authorityCode=" + authorityCode +
                ", authorityName='" + authorityName + '\'' +
                ", authorityDesc='" + authorityDesc + '\'' +
                '}';
    }
}





