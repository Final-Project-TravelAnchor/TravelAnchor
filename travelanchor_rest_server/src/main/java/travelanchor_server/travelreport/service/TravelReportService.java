package travelanchor_server.travelreport.service;

import io.swagger.v3.oas.annotations.Operation;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import travelanchor_server.common.Criteria;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.travelplan.dto.TravelPlanDTO;
import travelanchor_server.travelplan.entity.TravelPlan;
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

    public Object findTravelReportDetail(int reportCode) {
        log.info("[TravelReportService] findTravelReportDetail()");

        // 해당 Code의 여행 일정을 가져옴.
        TravelReport travelReport = travelReportRepository.findById(reportCode).get();

        return modelMapper.map(travelReport, TravelReport.class);
    }

    @Transactional
    public Object insertTravelReport(TravelReportDTO travelReportDTO) {
        log.info("[TravelReportService] insertTravelReport() Start");
        log.info("[TravelReportService] travelReportDTO : " + travelReportDTO);
        int result = 0;

        try {
            TravelReport insertTravelReport = modelMapper.map(travelReportDTO, TravelReport.class);

            travelReportRepository.save(insertTravelReport);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelReportService] insertTravelReport() End");

        return (result > 0) ? "여행 후기 입력 성공" : "여행 후기 입력 실패";
    }

    @Transactional
    public Object updateTravelReport(int reportCode, TravelReportDTO travelReportDTO) {
        log.info("[TravelReportService] updateTravelReport() Start");
        log.info("[TravelReportService] reportCode : "+ reportCode);
        int result = 0;

        try{
            TravelReport travelReport = travelReportRepository.findById(reportCode).get();
            log.info("[TravelReportService] travelReport : " + travelReport);
            travelReport.setReportTitle(travelReportDTO.getReportTitle());
            travelReport.setReportContent(travelReportDTO.getReportContent());
            travelReport.setReportDestination(travelReportDTO.getReportDestination());
            travelReport.setReportTheme(travelReportDTO.getReportTheme());

            System.out.println("travelReport = " + travelReport);

            travelReportRepository.save(travelReport);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelReportService] updateTravelReport() End");
        return (result > 0) ? "여행 후기 수정 성공" : "여행 후기 수정 실패";
    }

    @Transactional
    public Object deleteTravelReport(int reportCode, TravelReportDTO travelReportDTO) {
        log.info("[TravelReportService] deleteTravelReport() Start");
        log.info("[TravelReportService] reportCode : "+ reportCode);
        int result = 0;

        try{
            TravelReport travelReport = travelReportRepository.findById(reportCode).get();
            log.info("[TravelReportService] travelReport : " + travelReport);
            travelReport.setReportIsdeleted(travelReportDTO.getReportIsdeleted());

            System.out.println("travelReport = " + travelReport);

            travelReportRepository.save(travelReport);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelReportService] deleteTravelReport() End");
        return (result > 0) ? "여행 후기 삭제 성공" : "여행 후기 삭제 실패";
    }
}
