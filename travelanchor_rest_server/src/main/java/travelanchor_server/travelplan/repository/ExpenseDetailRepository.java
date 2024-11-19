package travelanchor_server.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelanchor_server.travelplan.entity.ExpenseDetail;

import java.util.List;

public interface ExpenseDetailRepository extends JpaRepository<ExpenseDetail, Integer> {

    List<ExpenseDetail> findByExpenseCodeAndMemberCode(int expenseDetailCode, int memberCode);

    void deleteByExpenseCodeAndMemberCode(int expenseCode, int memberCode);

    List<ExpenseDetail> findAll();

    List<ExpenseDetail> findByExpenseCode(int expenseDetailCode);

    List<ExpenseDetail> findByExpenseDetailCode(int expenseDetailCode);
}
