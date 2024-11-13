package travelanchor_server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Member findByMemberId(String memberId);
}
