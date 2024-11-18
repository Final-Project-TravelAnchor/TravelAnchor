package travelanchor_server.comment.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.comment.dto.CommentDTO;
import travelanchor_server.comment.entity.Comment;
import travelanchor_server.comment.repository.CommentRepository;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.travelplan.entity.Activity;
import travelanchor_server.travelplan.entity.Expense;
import travelanchor_server.travelplan.entity.ExpenseDetail;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CommentService(CommentRepository commentRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
    }

    public Object findCommentList() {

        log.info("[CommentService] findCommentList() Start");

        List<Comment> commentList = commentRepository.findAll();
//        List<CommentDTO> commentDTOList = commentList.stream()
//                .map(comment -> modelMapper.map(comment, CommentDTO.class))
//                .collect(Collectors.toList());
        log.info("[CommentService] commentList = " + commentList);

        log.info("[CommentService] findCommentList() End");

//        return modelMapper.map(commentList, Comment.class);
        return commentList.stream().map(comment -> modelMapper.map(comment, Comment.class)).collect(Collectors.toList());
    }

    public Object findCommentDetail(int reportCode) {
        log.info("[CommentService] findCommentDetail()");

        // 해당 Code의 여행 일정을 가져옴.
        Comment comment = commentRepository.findById(reportCode).get();

        return modelMapper.map(comment, Comment.class);
    }

    @Transactional
    public Object insertComment(CommentDTO commentDTO) {
        log.info("[CommentService] insertComment() Start");
        log.info("[CommentService] commentDTO : " + commentDTO);
        int result = 0;

        try {
            Comment insertComment = modelMapper.map(commentDTO, Comment.class);

            commentRepository.save(insertComment);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[CommentService] insertComment() End");

        return (result > 0) ? "댓글 입력 성공" : "댓글 입력 실패";
    }

    @Transactional
    public Object updateComment(int reportCode, CommentDTO commentDTO) {
        log.info("[CommentService] updateComment() Start");
        log.info("[CommentService] reportCode : "+ reportCode);
        int result = 0;

        try{
            Comment comment = commentRepository.findById(reportCode).get();
            log.info("[CommentService] comment : " + comment);
            comment.setCommentContent(commentDTO.getCommentContent());

            System.out.println("comment = " + comment);

            commentRepository.save(comment);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[CommentService] updateComment() End");
        return (result > 0) ? "댓글 수정 성공" : "댓글 수정 실패";
    }

    @Transactional
    public Object deleteComment(int commentCode) {
        log.info("[CommentService] deleteComment() Start");
        log.info("[CommentService] commentCode : " + commentCode);
        int result = 0;

        try {
            Comment comment = commentRepository.findById(commentCode).get();

            log.info("[CommentService] comment : " + comment.getCommentCode());

            commentRepository.delete(comment);

            log.info("[CommentService] Delete Complete : ");


            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);

        }
        log.info("[CommentService] deleteComment() End");
        return (result > 0) ? "댓글 삭제 성공" : "댓글 삭제 실패";
    }

}
