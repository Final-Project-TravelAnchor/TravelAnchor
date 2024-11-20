package travelanchor_server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.member.entity.Point;

public interface PointRepository extends JpaRepository<Point, Integer> {
    Point findByMemberCode(int memberCode);
}
