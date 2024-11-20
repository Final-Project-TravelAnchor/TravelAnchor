package travelanchor_server.comment.dto;

import java.util.Date;

public class CommentDTO {

    private int commentCode;
    private int freeBoardCode;
    private int memberCode;
    private String commentContent;
    private Date commentCreatedAt;

    public CommentDTO() {
    }

    public CommentDTO(int commentCode, int freeBoardCode, int memberCode, String commentContent, Date commentCreatedAt) {
        this.commentCode = commentCode;
        this.freeBoardCode = freeBoardCode;
        this.memberCode = memberCode;
        this.commentContent = commentContent;
        this.commentCreatedAt = commentCreatedAt;
    }

    public int getCommentCode() {
        return commentCode;
    }

    public void setCommentCode(int commentCode) {
        this.commentCode = commentCode;
    }

    public int getFreeBoardCode() {
        return freeBoardCode;
    }

    public void setFreeBoardCode(int freeBoardCode) {
        this.freeBoardCode = freeBoardCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public Date getCommentCreatedAt() {
        return commentCreatedAt;
    }

    public void setCommentCreatedAt(Date commentCreatedAt) {
        this.commentCreatedAt = commentCreatedAt;
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
                "commentCode=" + commentCode +
                ", freeBoardCode=" + freeBoardCode +
                ", memberCode=" + memberCode +
                ", commentContent='" + commentContent + '\'' +
                ", commentCreatedAt=" + commentCreatedAt +
                '}';
    }
}
