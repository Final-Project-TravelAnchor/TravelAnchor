package travelanchor_server.population.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.population.entity.Notice;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    List<Notice> findByNoticeOnoff(String y);
}
