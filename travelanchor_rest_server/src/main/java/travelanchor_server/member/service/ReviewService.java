package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.member.dto.ReviewDTO;
import travelanchor_server.member.entity.Review;
import travelanchor_server.member.repository.ReviewRepository;

@Service
public class ReviewService {

    private static final Logger log = LoggerFactory.getLogger(ReviewService.class);
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ModelMapper modelMapper) {
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
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

        return (result > 0) ? "회원후기 수정 성공" : "회원후기 수정 실패";
    }
}
