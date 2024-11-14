package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.member.dto.ReviewDTO;
import travelanchor_server.member.entity.Review;
import travelanchor_server.member.repository.MemberRepository;
import travelanchor_server.member.repository.ReviewRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private static final Logger log = LoggerFactory.getLogger(ReviewService.class);
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;
    private final MemberRepository memberRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ModelMapper modelMapper, MemberRepository memberRepository) {
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Object insertMemberReport(ReviewDTO reviewDTO) {
        log.info("[ReviewService] insertMemberReport() Start");
        log.info("[ReviewService] reviewDTO : ", reviewDTO);
        int result = 0;

        try{

            Review review = modelMapper.map(reviewDTO, Review.class);

            reviewRepository.save(review);

            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.info("[ReviewService] insertMemberReport() End");

        return (result > 0) ? "회원후기 작성 성공" : "회원후기 작성 실패";
    }

    @Transactional
    public Object updateMemberReport(ReviewDTO reviewDTO) {
        log.info("[ReviewService] updateMemberReport() Start");
        log.info("[ReviewService] reviewDTO : ", reviewDTO);
        int result = 0;

        try{
            Review review = reviewRepository.findById(reviewDTO.getMemberReviewCode()).get();

            review.setMemberReviewCode(reviewDTO.getMemberReviewCode());
            review.setMemberCode(reviewDTO.getMemberCode());
            review.setReviewCategoryCode(reviewDTO.getReviewCategoryCode());
            review.setReviewCategorySubCode(reviewDTO.getReviewCategorySubCode());
            review.setMemberReview(reviewDTO.getMemberReview());
            review.setMemberReviewIsvisible(reviewDTO.getMemberReviewIsvisible());

            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.info("[ReviewService] updateMemberReport() End");

        return (result > 0) ? "회원후기 수정 성공" : "회원후기 수정 실패";
    }

    public Object findAllMemberReport(int memberRatingCode) {
        log.info("[ReviewService] findAllMemberReport() Start");
        log.info("[ReviewService] memberRatingCode : ", memberRatingCode);
        int result = 0;

        List<Review> reviewList;
        try {


            reviewList = reviewRepository.findByMemberRatingCode(memberRatingCode);
            log.info("[ReviewService] reviewList : ", reviewList);


            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return reviewList.stream().map(review -> modelMapper.map(review, Review.class)).collect(Collectors.toList());
    }

    public Object findOtherMemberReport(int memberCode) {
        log.info("[ReviewService] findOtherMemberReport() Start");
        log.info("[ReviewService] memberCode : ", memberCode);
        int result = 0;


        List<Review> reviewList;
        try {
            reviewList = reviewRepository.findByMemberCode(memberCode);
            log.info("[ReviewService] reviewList : ", reviewList);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.info("[ReviewService] findOtherMemberReport() End");
        return reviewList.stream().map(review -> modelMapper.map(review, Review.class)).collect(Collectors.toList());
    }
}
