package travelanchor_server.member.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_member_reviews")
public class Review {

    @Id
    @Column(name = "member_review_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberReviewCode;

    @Column(name = "review_category_code")
    private int reviewCategoryCode;

    @Column(name = "review_category_sub_code")
    private int reviewCategorySubCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "member_review")
    private String memberReview;

    @Column(name = "member_review_isvisible")
    private String memberReviewIsvisible;

    public Review() {
    }

    public Review(int memberReviewCode, int reviewCategoryCode, int reviewCategorySubCode, int memberCode, String memberReview, String memberReviewIsvisible) {
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
        return "Review{" +
                "memberReviewCode=" + memberReviewCode +
                ", reviewCategoryCode=" + reviewCategoryCode +
                ", reviewCategorySubCode=" + reviewCategorySubCode +
                ", memberCode=" + memberCode +
                ", memberReview='" + memberReview + '\'' +
                ", memberReviewIsvisible='" + memberReviewIsvisible + '\'' +
                '}';
    }
}
