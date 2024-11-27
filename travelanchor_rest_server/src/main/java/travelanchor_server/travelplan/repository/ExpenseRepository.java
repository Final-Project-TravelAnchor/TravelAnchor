package travelanchor_server.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelplan.entity.Expense;

import java.util.List;
import java.util.Map;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByActivityCode(int activityCode);

    void deleteByExpenseCode(int expenseCode);


    List<Expense> findAll();

    List<Expense> findByTravelCode(int travelCode);
}
