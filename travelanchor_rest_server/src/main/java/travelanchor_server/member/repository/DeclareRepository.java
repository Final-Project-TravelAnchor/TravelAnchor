package travelanchor_server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.member.entity.Declare;

public interface DeclareRepository extends JpaRepository<Declare, Integer> {
}
