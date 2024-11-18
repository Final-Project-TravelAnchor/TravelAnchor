package travelanchor_server.freeboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.freeboard.entity.FreeBoard;

import java.util.List;

public interface FreeBoardRepository extends JpaRepository<FreeBoard, Integer> {
    List<FreeBoard> findAll();
}
