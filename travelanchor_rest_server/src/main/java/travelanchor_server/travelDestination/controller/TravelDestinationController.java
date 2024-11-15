package travelanchor_server.travelDestination.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.travelDestination.dto.TravelDestinationDTO;
import travelanchor_server.travelDestination.service.TravelDestinationService;

@RestController
@RequestMapping("/travel-destination/v1")
public class TravelDestinationController {

    private final TravelDestinationService travelDestinationService;

    @Autowired
    public TravelDestinationController(TravelDestinationService travelDestinationService) {
        this.travelDestinationService = travelDestinationService;
    }

    @Operation(summary = "여행지 저장 요청", description = "여행지 저장이 진행됩니다.", tags = { "TravelDestinationController" })
    @PostMapping("/travel-destinations")
    public ResponseEntity<ResponseDTO> insertTravelDestination(@RequestBody TravelDestinationDTO travelDestinationDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "여행지 저장 성공", travelDestinationService.insertTravelDestination(travelDestinationDTO)));
    }
}
