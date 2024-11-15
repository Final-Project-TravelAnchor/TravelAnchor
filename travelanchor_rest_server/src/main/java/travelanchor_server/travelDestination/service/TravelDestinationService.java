package travelanchor_server.travelDestination.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.travelDestination.dto.TravelDestinationDTO;
import travelanchor_server.travelDestination.entity.TravelDestination;
import travelanchor_server.travelDestination.repository.TravelDestinationRepository;

@Service
public class TravelDestinationService {

    private static final Logger log = LoggerFactory.getLogger(TravelDestinationService.class);

    private final TravelDestinationRepository travelDestinationRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TravelDestinationService(TravelDestinationRepository travelDestinationRepository, ModelMapper modelMapper) {
        this.travelDestinationRepository = travelDestinationRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public Object insertTravelDestination(TravelDestinationDTO travelDestinationDTO) {

        log.info("[TravelDestinationService] insertTravelDestination() Start");
        log.info("[TravelDestinationService] restaurantDTO : ", travelDestinationDTO);

        int result = 0;

        try {
            TravelDestination insertTravelDestination = modelMapper.map(travelDestinationDTO, TravelDestination.class);

            travelDestinationRepository.save(insertTravelDestination);

            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[TravelDestinationService] insertTravelDestination() End");

        return (result > 0) ? "여행지 저장 성공" : "여행지 저장 실페";
    }
}
