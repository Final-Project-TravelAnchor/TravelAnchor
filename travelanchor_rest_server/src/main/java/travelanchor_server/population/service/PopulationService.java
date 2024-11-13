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

    public Object selectPopulationList() {

        log.info("[PopulationService] selectPopulationList() Start");

        List<Population> populationList = populationRepository.findAll();
//        List<PopulationDTO> populationDTOList = populationList.stream()
//                .map(population -> modelMapper.map(population, PopulationDTO.class))
//                .collect(Collectors.toList());
        log.info("[PopulationService] populationList = " + populationList);

        log.info("[PopulationService] selectPopulationList() End");

//        return modelMapper.map(populationList, Population.class);
        return populationList.stream().map(population -> modelMapper.map(population, Population.class)).collect(Collectors.toList());
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
