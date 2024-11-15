package travelanchor_server.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelplan.entity.Expense;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findAll();
}
