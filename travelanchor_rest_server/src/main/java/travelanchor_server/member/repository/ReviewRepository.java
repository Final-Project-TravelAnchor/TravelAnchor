package travelanchor_server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.member.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
