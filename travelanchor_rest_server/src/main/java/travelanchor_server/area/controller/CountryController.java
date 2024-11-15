package travelanchor_server.area.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelanchor_server.area.service.CountryService;
import travelanchor_server.common.ResponseDTO;

@RestController
@RequestMapping("/country/v1")
public class CountryController {

    private static final Logger log = LoggerFactory.getLogger(CountryController.class);

    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) { this.countryService = countryService; }

    @Operation(summary = "전체 국가 조회", description = "전체 국가 찾기", tags = {"CountryController"})
    @GetMapping("/country")
    public ResponseEntity<ResponseDTO> findCountry() {

        log.info("도시컨트롤러: 전체도시조회");

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", countryService.findCountry()));
    }

}