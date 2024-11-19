package travelanchor_server.population.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_notice")
public class Notice {

    @Id
    @Column(name = "notice_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeCode;

    @Column(name = "notice_name")
    private String noticeName;

    @Column(name = "notice_writer")
    private String noticeWriter;

    @Column(name = "notice_created_at")
    private String noticeCreatedAt;

    @Column(name = "notice_views")
    private int noticeViews;

    @Column(name = "notice_contents")
    private String noticeContents;

    @Column(name = "notice_onoff")
    private String noticeOnoff;

    public Notice(int noticeCode, String noticeName, String noticeWriter, String noticeCreatedAt, int noticeViews, String noticeContents, String noticeOnoff) {
        this.noticeCode = noticeCode;
        this.noticeName = noticeName;
        this.noticeWriter = noticeWriter;
        this.noticeCreatedAt = noticeCreatedAt;
        this.noticeViews = noticeViews;
        this.noticeContents = noticeContents;
        this.noticeOnoff = noticeOnoff;
    }

    public Notice() {

    }

    public int getNoticeCode() {
        return noticeCode;
    }

    public void setNoticeCode(int noticeCode) {
        this.noticeCode = noticeCode;
    }

    public String getNoticeName() {
        return noticeName;
    }

    public void setNoticeName(String noticeName) {
        this.noticeName = noticeName;
    }

    public String getNoticeWriter() {
        return noticeWriter;
    }

    public void setNoticeWriter(String noticeWriter) {
        this.noticeWriter = noticeWriter;
    }

    public String getNoticeCreatedAt() {
        return noticeCreatedAt;
    }

    public void setNoticeCreatedAt(String noticeCreatedAt) {
        this.noticeCreatedAt = noticeCreatedAt;
    }

    public int getNoticeViews() {
        return noticeViews;
    }

    public void setNoticeViews(int noticeViews) {
        this.noticeViews = noticeViews;
    }

    public String getNoticeContents() {
        return noticeContents;
    }

    public void setNoticeContents(String noticeContents) {
        this.noticeContents = noticeContents;
    }

    public String getNoticeOnoff() {
        return noticeOnoff;
    }

    public void setNoticeOnoff(String noticeOnoff) {
        this.noticeOnoff = noticeOnoff;
    }

    @Override
    public String toString() {
        return "Notice{" +
                "noticeCode=" + noticeCode +
                ", noticeName='" + noticeName + '\'' +
                ", noticeWriter='" + noticeWriter + '\'' +
                ", noticeCreatedAt='" + noticeCreatedAt + '\'' +
                ", noticeViews=" + noticeViews +
                ", noticeContents='" + noticeContents + '\'' +
                ", noticeOnoff='" + noticeOnoff + '\'' +
                '}';
    }
}
