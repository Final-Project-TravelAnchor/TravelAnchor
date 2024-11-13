package travelanchor_server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.member.entity.MemberRole;
import travelanchor_server.member.entity.MemberRolePk;

public interface MemberRoleRepository extends JpaRepository<MemberRole, MemberRolePk> {

}
