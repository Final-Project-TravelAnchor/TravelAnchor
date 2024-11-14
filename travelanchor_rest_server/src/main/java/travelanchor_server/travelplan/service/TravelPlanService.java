package travelanchor_server.travelplan.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.travelplan.dto.TravelPlanDTO;
import travelanchor_server.travelplan.entity.TravelPlan;
import travelanchor_server.travelplan.repository.TravelPlanRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelPlanService {

    private static final Logger log = LoggerFactory.getLogger(TravelPlanService.class);

    private final TravelPlanRepository travelPlanRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TravelPlanService(TravelPlanRepository travelPlanRepository, ModelMapper modelMapper) {
        this.travelPlanRepository = travelPlanRepository;
        this.modelMapper = modelMapper;
    }

    public Object findTravelPlanList() {

        log.info("[TravelReportService] findTravelReportList() Start");

        List<TravelPlan> travelPlanList = travelPlanRepository.findAll();
//        List<TravelReportDTO> travelReportDTOList = travelReportList.stream()
//                .map(travelReport -> modelMapper.map(travelReport, TravelReportDTO.class))
//                .collect(Collectors.toList());
        log.info("[TravelReportService] travelPlanList = " + travelPlanList);

        log.info("[TravelReportService] findTravelReportList() End");

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
        log.info("[TravelPlanService] travelPlanDTO : ", travelPlanDTO);
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
}
