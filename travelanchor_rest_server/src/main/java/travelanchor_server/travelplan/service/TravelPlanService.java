package travelanchor_server.travelplan.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.travelplan.dto.*;
import travelanchor_server.travelplan.entity.Activity;
import travelanchor_server.travelplan.entity.Expense;
import travelanchor_server.travelplan.entity.ExpenseDetail;
import travelanchor_server.travelplan.entity.TravelDay;
import travelanchor_server.travelplan.entity.TravelPlan;
import travelanchor_server.travelplan.repository.*;

import travelanchor_server.travelplan.dto.TravelPlanDTO;
import travelanchor_server.travelplan.entity.Expense;
import travelanchor_server.travelplan.entity.ExpenseDetail;
import travelanchor_server.travelplan.entity.TravelPlan;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelPlanService {

    private static final Logger log = LoggerFactory.getLogger(TravelPlanService.class);

    private final TravelPlanRepository travelPlanRepository;
    private final TravelDayRepository travelDayRepository;
    private final ActivityRepository activityRepository;

    private final ExpenseRepository expenseRepository;
    private final ExpenseDetailRepository expenseDetailRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TravelPlanService(TravelPlanRepository travelPlanRepository, TravelDayRepository travelDayRepository, ActivityRepository activityRepository, ExpenseRepository expenseRepository, ExpenseDetailRepository expenseDetailRepository, ModelMapper modelMapper) {
        this.travelPlanRepository = travelPlanRepository;
        this.travelDayRepository = travelDayRepository;
        this.activityRepository = activityRepository;

        this.expenseRepository = expenseRepository;
        this.expenseDetailRepository = expenseDetailRepository;
        this.modelMapper = modelMapper;
    }

    // 여행 일정
    public Object findTravelPlanList() {

        log.info("[TravelPlanService] findTravelPlanList() Start");

        List<TravelPlan> travelPlanList = travelPlanRepository.findAll();
//        List<TravelReportDTO> travelReportDTOList = travelReportList.stream()
//                .map(travelReport -> modelMapper.map(travelReport, TravelReportDTO.class))
//                .collect(Collectors.toList());
        log.info("[TravelPlanService] travelPlanList = " + travelPlanList);

        log.info("[TravelPlanService] findTravelPlanList() End");

//        return modelMapper.map(travelReportList, TravelReport.class);
        return travelPlanList.stream().map(travelPlan -> modelMapper.map(travelPlan, TravelPlan.class)).collect(Collectors.toList());
    }

    public Object findTravelPlanDetail(int travelCode) {
        log.info("[TravelPlanService] findTravelPlanDetail()");

        // 해당 Code의 여행 일정을 가져옴.
        TravelPlan travelPlan = travelPlanRepository.findById(travelCode).get();

        return modelMapper.map(travelPlan, TravelPlan.class);
    }

    @Transactional
    public Object insertTravelPlan(TravelPlanDTO travelPlanDTO) {
        log.info("[TravelPlanService] insertTravelPlan() Start");
        log.info("[TravelPlanService] travelPlanDTO : " + travelPlanDTO);
        int result = 0;

        try {
            TravelPlan insertTravelPlan = modelMapper.map(travelPlanDTO, TravelPlan.class);

            travelPlanRepository.save(insertTravelPlan);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelPlanService] insertTravelPlan() End");

        return (result > 0) ? "여행 일정 입력 성공" : "여행 일정 입력 실패";
    }

    @Transactional
    public Object updateTravelPlan(int travelCode, TravelPlanDTO travelPlanDTO) {
        log.info("[TravelPlanService] updateTravelPlan() Start");
        log.info("[TravelPlanService] travelCode : "+ travelCode);
        int result = 0;

        try{

            TravelPlan travelPlan = travelPlanRepository.findById(travelCode).get();
            log.info("[TravelPlanService] travelPlan : " + travelPlan);
            travelPlan.setTravelName(travelPlanDTO.getTravelName());
            travelPlan.setTravelStartDate(travelPlanDTO.getTravelStartDate());
            travelPlan.setTravelEndDate(travelPlanDTO.getTravelEndDate());
            travelPlan.setTravelTotalDate(travelPlanDTO.getTravelTotalDate());
            travelPlan.setTravelDestination(travelPlanDTO.getTravelDestination());
            travelPlan.setTravelOnoff(travelPlanDTO.getTravelOnoff());

            System.out.println("travelPlan = " + travelPlan);

            travelPlanRepository.save(travelPlan);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelPlanService] updateTravelPlan() End");
        return (result > 0) ? "여행 일정 수정 성공" : "여행 일정 수정 실패";
    }

    @Transactional
    public Object deleteTravelPlan(int travelCode, TravelPlanDTO travelPlanDTO) {
        log.info("[TravelPlanService] deleteTravelPlan() Start");
        log.info("[TravelPlanService] travelCode : "+ travelCode);
        int result = 0;

        try{
            TravelPlan travelPlan = travelPlanRepository.findById(travelCode).get();
            log.info("[TravelPlanService] travelPlan : " + travelPlan);
            travelPlan.setTravelIsdeleted(travelPlanDTO.getTravelIsdeleted());

            System.out.println("travelPlan = " + travelPlan);

            travelPlanRepository.save(travelPlan);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelPlanService] deleteTravelPlan() End");
        return (result > 0) ? "여행 일정 삭제 성공" : "여행 일정 삭제 실패";
    }

    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 일자별 일정

    public Object findTravelDayPlanList() {

        log.info("[TravelPlanService] findTravelDayPlanList() Start");

        List<TravelDay> travelDayPlanList = travelDayRepository.findAll();

        log.info("[TravelPlanService] travelDayPlanList = " + travelDayPlanList);
        log.info("[TravelPlanService] findTravelDayPlanList() End");

        return travelDayPlanList.stream().map(travelDay -> modelMapper.map(travelDay, TravelDay.class)).collect(Collectors.toList());
    }

    public Object findTravelDayPlanDetail(int dayCode) {
        log.info("[TravelPlanService] findTravelDayPlanDetail()");

        TravelDay travelDay = travelDayRepository.findById(dayCode).get();

        return modelMapper.map(travelDay, TravelDay.class);
    }

    @Transactional
    public Object insertTravelDayPlan(TravelDayDTO travelDayDTO) {
        log.info("[TravelPlanService] insertTravelDayPlan() Start");
        log.info("[TravelPlanService] travelDayDTO : "+ travelDayDTO);
        int result = 0;

        try {
            TravelDay insertTravelDayPlan = modelMapper.map(travelDayDTO, TravelDay.class);
            travelDayRepository.save(insertTravelDayPlan);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelPlanService] insertTravelDayPlan() End");

        return (result > 0) ? "여행 일자별 일정 입력 성공" : "여행 일자별 일정 입력 실패";
    }

    @Transactional
    public Object updateTravelDayPlan(int dayCode, TravelDayDTO travelDayDTO) {
        log.info("[TravelPlanService] updateTravelDayPlan() Start");
        log.info("[TravelPlanService] dayCode : " + dayCode);
        int result = 0;

        try {
            TravelDay travelDay = travelDayRepository.findById(dayCode).get();
            log.info("[TravelPlanService] : " + travelDay);
            travelDay.setDayDate(travelDayDTO.getDayDate());
            travelDay.setDayNumber(travelDayDTO.getDayNumber());

            System.out.println("travelDay = " + travelDay);

            travelDayRepository.save(travelDay);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelPlanService] updateTravelDayPlan() End");
        return (result > 0) ? "여행 일자별 일정 수정 성공" : "여행 일자별 일정 수정 실패";
    }


    @Transactional
    public Object deleteTravelDayPlan(int dayCode, MemberDTO memberDTO) {
        log.info("[TravelPlanService] deleteTravelDayPlan() Start");
        log.info("[TravelPlanService] dayCode : " + dayCode);
        log.info("[TravelPlanService] memberDTO : " + memberDTO);
        int result = 0;

        try {
            TravelDay travelDay = travelDayRepository.findById(dayCode).get();
            List<Activity> activity = activityRepository.findByDayCode(travelDay.getDayCode());
            List<Expense> expense = expenseRepository.findByActivityCode(activity.get(0).getActivityCode());
            List<ExpenseDetail> expenseDetail = expenseDetailRepository.findByExpenseCodeAndMemberCode(expense.get(0).getExpenseCode(), memberDTO.getMemberCode());

            log.info("[TravelPlanService] travelDay : " + travelDay.getDayCode());
            log.info("[TravelPlanService] activity : " + activity.get(0));
            log.info("[TravelPlanService] expense : " + expense.get(0));
            log.info("[TravelPlanService] expenseDetail : " + expenseDetail.get(0));

            expenseDetailRepository.deleteByExpenseCodeAndMemberCode(expenseDetail.get(0).getExpenseCode(), memberDTO.getMemberCode());
            expenseRepository.deleteByExpenseCode(expense.get(0).getExpenseCode());
            activityRepository.deleteByActivityCode(activity.get(0).getActivityCode());
            travelDayRepository.delete(travelDay);

            log.info("[TravelPlanService] Delete Complete : ");

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelPlanService] deleteTravelDayPlan() End");
        return (result > 0) ? "여행 일자별 일정 삭제 성공" : "여행 일자별 일정 삭제 실패";
    }

    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 활동정보

    public Object findTravelActivityPlanList() {
        log.info("[TravelPlanService] findTravelActivityPlanList() Start");

        List<Activity> activityList = activityRepository.findAll();

        log.info("[TravelPlanService] activityList = " + activityList);
        log.info("[TravelPlanService] findTravelActivityPlanList() End");

        return activityList.stream().map(activity -> modelMapper.map(activity, Activity.class)).collect(Collectors.toList());
    }

    public Object findTravelActivityDetail(int activityCode) {
        log.info("[TravelPlanService] findTravelActivityPlanDetail()");

        Activity activity = activityRepository.findById(activityCode).get();

        return modelMapper.map(activity, Activity.class);
    }
    
    @Transactional
    public Object insertTravelActivityPlan(ActivityDTO activityDTO) {
        log.info("[TravelPlanService] insertTravelActivityPlan() Start");
        log.info("[TravelPlanService] ActivityDTO : " + activityDTO);
        int result = 0;

        try {
            Activity insertTravelActivityPlan = modelMapper.map(activityDTO, Activity.class);
            activityRepository.save(insertTravelActivityPlan);

            result = 1;
        } catch (Exception e){
            throw new RuntimeException(e);
        }
        log.info("[TravelPlanService] insertTravelActivityPlan() End");

        return (result > 0) ? "여행 활동별 일정 입력 성공" : "여행 활동별 일정 입력 실패";
    }

    @Transactional
    public Object updateTravelActivityPlan(int activityCode, ActivityDTO activityDTO) {
        log.info("[TravelPlanService] updateTravelActivityPlan() Start");
        log.info("[TravelPlanService] activityCode : " + activityCode);
        int result = 0;

        try {
            Activity activity = activityRepository.findById(activityCode).get();
            log.info("[TravelPlanService] : " + activity);
            activity.setActivityTitle(activityDTO.getActivityTitle());
            activity.setActivityDetail(activityDTO.getActivityDetail());

            System.out.println("activity = " + activity);

            activityRepository.save(activity);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelPlanService] updateTravelActivityPlan() End");
        return (result > 0) ? "여행 활동별 일정 수정 성공" : "여행 활동별 일정 수정 실패";
    }

    @Transactional
    public Object deleteTravelActivityPlan(int activityCode, MemberDTO memberDTO) {
        log.info("[TravelPlanService] deleteTravelActivityPlan() Start");
        log.info("[TravelPlanService] activityCode : " + activityCode);
        log.info("[TravelPlanService] memberDTO : " + memberDTO);
        int result = 0;

        try {
            Activity activity = activityRepository.findById(activityCode).get();
            List<Expense> expense = expenseRepository.findByActivityCode(activity.getActivityCode());
            List<ExpenseDetail> expenseDetail = expenseDetailRepository.findByExpenseCodeAndMemberCode(expense.get(0).getExpenseCode(), memberDTO.getMemberCode());

            log.info("[TravelPlanService] activity : " + activity.getActivityCode());
            log.info("[TravelPlanService] expense : " + expense.get(0));
            log.info("[TravelPlanService] expenseDetail : " + expenseDetail.get(0));

            expenseDetailRepository.deleteByExpenseCodeAndMemberCode(expenseDetail.get(0).getExpenseCode(), memberDTO.getMemberCode());
            expenseRepository.deleteByExpenseCode(expense.get(0).getExpenseCode());
            activityRepository.delete(activity);

            log.info("[TravelPlanService] Delete Complete : ");


            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);

        }
        log.info("[TravelPlanService] deleteTravelActivityPlan() End");
        return (result > 0) ? "여행 활동별 일정 삭제 성공" : "여행 활동별 일정 삭제 실패";
    }


    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 활동금액

    public Object findExpenseList() {

        log.info("[TravelPlanService] findExpenseList() Start");

        List<Expense> expenseList = expenseRepository.findAll();

        log.info("[TravelPlanService] findExpensetList() End");

        return expenseList.stream().map(travelPlan -> modelMapper.map(travelPlan, Expense.class)).collect(Collectors.toList());

    }

    public Object findExpenseDetail(int expenseCode) {
        log.info("[TravelPlanService] findExpenseDetail()");


        Expense expense = expenseRepository.findById(expenseCode).get();

        return modelMapper.map(expense, Expense.class);
    }

    @Transactional
    public Object insertExpense(ExpenseDTO expenseDTO) {
        log.info("[TravelPlanService] expenseDTO : " + expenseDTO);
        int result = 0;

        try {
            Expense insertExpense = modelMapper.map(expenseDTO, Expense.class);

            expenseRepository.save(insertExpense);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[ExpenseService] insertExpense() End");

        return (result > 0) ? "활동금액 입력 성공" : "활동금액 입력 실패";
    }


    @Transactional
    public Object updateExpense(int expenseCode, ExpenseDTO expenseDTO) {
        int result = 0;

        try{

            Expense expense = expenseRepository.findById(expenseCode).get();

            expense.setExpenseTotalAmount(expenseDTO.getExpenseTotalAmount());

        } catch(Exception e) {
            throw new RuntimeException(e);
        }
        return(result > 0) ? "활동금액 수정 성공" : "활동금액 수정 실패";
    }



    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    // 세부활동금액

    public Object findExpenseDeatilList() {

        List<ExpenseDetail> expenseDetailList = expenseDetailRepository.findAll();

        return expenseDetailList.stream().map(travelPlan -> modelMapper.map(travelPlan, ExpenseDetail.class)).collect(Collectors.toList());
    }

    public Object findExpenseDetailByCode(int expenseDetailCode) {

        ExpenseDetail expenseDetail = expenseDetailRepository.findById(expenseDetailCode).get();

        return modelMapper.map(expenseDetail, ExpenseDetail.class);

    }

    @Transactional
    public Object insertExpenseDetail(ExpenseDetailDTO expenseDetailDTO) {
        int result = 0;

        try {
            ExpenseDetail insertExpenseDetail = modelMapper.map(expenseDetailDTO, ExpenseDetail.class);

            expenseDetailRepository.save(insertExpenseDetail);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[ExpenseDetailService] insertExpenseDetail() End");
        log.info("[TravelPlanService] expenseDetailDTO : " + expenseDetailDTO);

        return (result > 0) ? "세부활동금액 입력 성공" : "활동금액 입력 실패";
    }

    @Transactional
    public Object updateExpenseDetail(int expenseDetailCode, ExpenseDetailDTO expenseDetailDTO) {
       int result = 0;

        try{

            ExpenseDetail expenseDetail = expenseDetailRepository.findById(expenseDetailCode).get();

            expenseDetail.setExpenseDetailAmount(expenseDetailDTO.getExpenseDetailAmount());
            expenseDetail.setMemberCode(expenseDetailDTO.getMemberCode());

        } catch(Exception e) {
            throw new RuntimeException(e);
        }
        return(result > 0) ? "세부활동금액 수정 성공" : "세부활동금액 수정 실패";
    }

}
