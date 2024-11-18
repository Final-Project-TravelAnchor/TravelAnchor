package travelanchor_server.travelDestination.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @Operation(summary = "회원 여행지 저장 리스트 조회 요청", description = "해당 회원의 저장한 여행지에 대한 리스트 조회가 진행됩니다.", tags = { "TravelDestinationController" })
    @GetMapping("/travel-destinations/{memberCode}")
    public ResponseEntity<ResponseDTO> getSavedTravelDestinationList(@PathVariable int memberCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "저장한 여행지 리스트 조회 성공", travelDestinationService.getSavedTravelDestinationList(memberCode)));
    }

    @Operation(summary = "저장한 여행지 삭제 요청", description = "저장한 여행지에 대한 삭제가 진행됩니다.", tags = { "TravelDestinationController" })
    @DeleteMapping("/travel-destinations/{favoriteCode}")
    public ResponseEntity<ResponseDTO> deleteSavedTravelDestination(@RequestBody TravelDestinationDTO travelDestinationDTO, @PathVariable int favoriteCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "저장한 여행지 삭제 성공", travelDestinationService.deleteSavedTravelDestination(travelDestinationDTO, favoriteCode)));
    }
}
