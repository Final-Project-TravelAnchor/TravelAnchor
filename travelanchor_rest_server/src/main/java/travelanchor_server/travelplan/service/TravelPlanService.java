package travelanchor_server.travelplan.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
}
