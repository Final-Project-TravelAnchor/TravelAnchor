package travelanchor_server.travelreport.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import travelanchor_server.common.Criteria;
import travelanchor_server.travelreport.dto.TravelReportDTO;
import travelanchor_server.travelreport.entity.TravelReport;
import travelanchor_server.travelreport.repository.TravelReportRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelReportService {

    private static final Logger log = LoggerFactory.getLogger(TravelReportService.class);

    private final TravelReportRepository travelReportRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TravelReportService(TravelReportRepository travelReportRepository, ModelMapper modelMapper) {
        this.travelReportRepository = travelReportRepository;
        this.modelMapper = modelMapper;
    }

    public Object findTravelReportList() {

        log.info("[TravelReportService] findTravelReportList() Start");

        List<TravelReport> travelReportList = travelReportRepository.findAll();
//        List<TravelReportDTO> travelReportDTOList = travelReportList.stream()
//                .map(travelReport -> modelMapper.map(travelReport, TravelReportDTO.class))
//                .collect(Collectors.toList());
        log.info("[TravelReportService] travelReportList = " + travelReportList);

        log.info("[TravelReportService] findTravelReportList() End");

//        return modelMapper.map(travelReportList, TravelReport.class);
        return travelReportList.stream().map(travelReport -> modelMapper.map(travelReport, TravelReport.class)).collect(Collectors.toList());
    }
}
