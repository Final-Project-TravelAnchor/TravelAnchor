package travelanchor_server.population.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.population.dto.PopulationDTO;
import travelanchor_server.population.entity.Population;
import travelanchor_server.population.repository.PopulationRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PopulationService {

    private static final Logger log = LoggerFactory.getLogger(PopulationService.class);

    private final PopulationRepository populationRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PopulationService(PopulationRepository populationRepository, ModelMapper modelMapper) {
        this.populationRepository = populationRepository;
        this.modelMapper = modelMapper;
    }

    public Object findPopulationList() {

        log.info("[PopulationService] findPopulationList() Start");

        // 전체조회
//        List<Population> populationList = populationRepository.findAll();
        List<Population> populationList = populationRepository.findByPopulationOnoff("Y");
//        List<PopulationDTO> populationDTOList = populationList.stream()
//                .map(population -> modelMapper.map(population, PopulationDTO.class))
//                .collect(Collectors.toList());
        log.info("[PopulationService] populationList = " + populationList);

        log.info("[PopulationService] findPopulationList() End");

//        return modelMapper.map(populationList, Population.class);
        return populationList.stream().map(population -> modelMapper.map(population, Population.class)).collect(Collectors.toList());
    }

    public Object findPopulationDetail(int populationCode) {
        log.info("[PopulationService] findPopulationDetail() Start");

        // 해당 Code의 모집공고 가져옴.
        Population population = populationRepository.findById(populationCode).get();

        // 가져온 모집공고의 여행Code를 가지고 여행일정 Reposit에서 일정가져오기.



        log.info("[PopulationService] selectPopulationDetail() End");
        return modelMapper.map(population, Population.class);
    }

    @Transactional
    public Object insertPopulation(PopulationDTO populationDTO) {
        log.info("[PopulationService] insertPopulation() Start");
        log.info("[PopulationService] populationDTO : ", populationDTO);
        int result = 0;

        try {
            Population insertPopulation = modelMapper.map(populationDTO, Population.class);

            populationRepository.save(insertPopulation);

            result = 1;
          } catch (Exception e) {
            throw new RuntimeException(e);
        }
      log.info("[PopulationService] insertPopulation() End");

        return (result > 0) ? "여행메이트 입력 성공" : "여행메이트 입력 실패";
    }


    @Transactional
    public Object updatePopulation(PopulationDTO populationDTO) {
        log.info("[PopulationService] updatePopulation() Start");
        log.info("[PopulationService] populationDTO : ", populationDTO);
        int result = 0;

        try{

            Population population = populationRepository.findById(populationDTO.getPopulationCode()).get();

            population.setTravelCode(populationDTO.getTravelCode());
            population.setMemberCode(populationDTO.getMemberCode());
            population.setCountryCode(populationDTO.getCountryCode());
            population.setPopulationTitle(populationDTO.getPopulationTitle());
            population.setPopulationDescription(populationDTO.getPopulationDescription());
            population.setPopulationCreatedAt(populationDTO.getPopulationCreatedAt());
            population.setPopulationViews(populationDTO.getPopulationViews());
            population.setPopulationPeople(populationDTO.getPopulationPeople());
            population.setPopulationOnoff(populationDTO.getPopulationOnoff());

            result = 1;
          } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[PopulationService] updatePopulation() End");
        return (result > 0) ? "여행메이트 수정 성공" : "여행메이트 수정 실패";
    }
}
