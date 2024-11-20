package travelanchor_server.population.dto;

import jakarta.persistence.Column;

public class NoticeDTO {


    private int noticeCode;
    private String noticeName;
    private String noticeWriter;
    private String noticeCreatedAt;
    private int noticeViews;
    private String noticeContents;
    private String noticeOnoff;

    public NoticeDTO() {}

    public NoticeDTO(int noticeCode, String noticeName, String noticeWriter, String noticeCreatedAt, int noticeViews, String noticeContents, String noticeOnoff) {
        this.noticeCode = noticeCode;
        this.noticeName = noticeName;
        this.noticeWriter = noticeWriter;
        this.noticeCreatedAt = noticeCreatedAt;
        this.noticeViews = noticeViews;
        this.noticeContents = noticeContents;
        this.noticeOnoff = noticeOnoff;
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
        return "NoticeDTO{" +
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
