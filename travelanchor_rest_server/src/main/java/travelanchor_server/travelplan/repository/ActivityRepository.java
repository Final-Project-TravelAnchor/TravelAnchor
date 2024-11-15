package travelanchor_server.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelplan.entity.Activity;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    List<Activity> findByDayCode(int dayCode);

    void deleteByActivityCode(int activityCode);
//    void findId(int dayCode);

//    Map<Object, Object> findByActivityCode(int activityCode);
}
