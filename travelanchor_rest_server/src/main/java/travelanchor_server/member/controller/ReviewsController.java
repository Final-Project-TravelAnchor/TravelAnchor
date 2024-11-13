package travelanchor_server.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.member.dto.ReviewDTO;
import travelanchor_server.member.service.ReviewService;

@RestController
@RequestMapping("/reviews/v1")
public class ReviewsController {

    private final ReviewService reviewService;


    @Autowired
    public ReviewsController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    @Operation(summary = "회원후기 작성 요청", description = "회원후기 작성 요청이 진행됩니다.", tags = {"ReportsController"})
    @PostMapping("/review")
    public ResponseEntity<ResponseDTO> insertMemberReport(@RequestBody ReviewDTO reviewDTO) {

        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.OK, "회원후기 작성 성공", reviewService.insertMemberReport(reviewDTO)));
    }
}
