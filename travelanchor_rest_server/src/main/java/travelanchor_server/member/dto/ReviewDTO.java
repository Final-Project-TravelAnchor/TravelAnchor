package travelanchor_server.member.dto;

public class ReviewDTO {

    private int memberReviewCode;
    private int reviewCategoryCode;
    private int reviewCategorySubCode;
    private int memberCode;
    private String memberReview;
    private String memberReviewIsvisible;

    public ReviewDTO() {}

    public ReviewDTO(int memberReviewCode, int reviewCategoryCode, int reviewCategorySubCode, int memberCode, String memberReview, String memberReviewIsvisible) {
        this.memberReviewCode = memberReviewCode;
        this.reviewCategoryCode = reviewCategoryCode;
        this.reviewCategorySubCode = reviewCategorySubCode;
        this.memberCode = memberCode;
        this.memberReview = memberReview;
        this.memberReviewIsvisible = memberReviewIsvisible;
    }

    public String getMemberReviewIsvisible() {
        return memberReviewIsvisible;
    }

    public void setMemberReviewIsvisible(String memberReviewIsvisible) {
        this.memberReviewIsvisible = memberReviewIsvisible;
    }

    public int getReviewCategorySubCode() {
        return reviewCategorySubCode;
    }

    public void setReviewCategorySubCode(int reviewCategorySubCode) {
        this.reviewCategorySubCode = reviewCategorySubCode;
    }

    public int getMemberReviewCode() {
        return memberReviewCode;
    }

    public void setMemberReviewCode(int memberReviewCode) {
        this.memberReviewCode = memberReviewCode;
    }

    public int getReviewCategoryCode() {
        return reviewCategoryCode;
    }

    public void setReviewCategoryCode(int reviewCategoryCode) {
        this.reviewCategoryCode = reviewCategoryCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getMemberReview() {
        return memberReview;
    }

    public void setMemberReview(String memberReview) {
        this.memberReview = memberReview;
    }

    @Override
    public String toString() {
        return "ReviewDTO{" +
                "memberReviewCode=" + memberReviewCode +
                ", reviewCategoryCode=" + reviewCategoryCode +
                ", reviewCategorySubCode=" + reviewCategorySubCode +
                ", memberCode=" + memberCode +
                ", memberReview='" + memberReview + '\'' +
                ", memberReviewIsvisible='" + memberReviewIsvisible + '\'' +
                '}';
    }
}
