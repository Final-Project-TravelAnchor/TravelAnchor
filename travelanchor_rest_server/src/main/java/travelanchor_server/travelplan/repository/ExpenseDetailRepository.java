package travelanchor_server.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelplan.entity.ExpenseDetail;

import java.util.List;

public interface ExpenseDetailRepository extends JpaRepository<ExpenseDetail, Integer> {
    List<ExpenseDetail> findAll();
}
