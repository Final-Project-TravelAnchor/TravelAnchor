package travelanchor_server.area.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travelanchor_server.area.controller.CityController;
import travelanchor_server.area.entity.City;
import travelanchor_server.area.repository.CityRepository;
import travelanchor_server.population.entity.Population;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CityService {

    private static final Logger log = LoggerFactory.getLogger(CityService.class);

    private final CityRepository cityRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CityService(CityRepository cityRepository, ModelMapper modelMapper) {
        this.cityRepository = cityRepository;
        this.modelMapper = modelMapper;
    }

    public Object findCity() {
        List<City> cities = cityRepository.findAll();
        return cities.stream().map(City -> modelMapper.map(City, City.class)).collect(Collectors.toList());
    }

    public Object findCountryCode(int countryCode) {
        log.info("[CityServiceService] findCountryCode() Start");

        List<City> citiesList = cityRepository.findByCountryCode(countryCode);


        log.info("[CityServiceService] findCountryCode() End");
        return citiesList.stream().map(city -> modelMapper.map(city, City.class)).collect(Collectors.toList());

    }
}
