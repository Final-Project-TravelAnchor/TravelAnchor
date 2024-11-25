package travelanchor_server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelanchor_server.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Member findByMemberId(String memberId);

    @Query("SELECT MAX(m.memberCode) FROM Member m")
    int maxMemberCode();

    Member findByMemberMobileNumber(String memberMobileNumber);

    int findMemberCodeByMemberId(String memberId);

    Member findByMemberNickName(String memberNickName);
}
