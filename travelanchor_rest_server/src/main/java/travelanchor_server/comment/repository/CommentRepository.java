package travelanchor_server.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.comment.entity.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAll();
}
