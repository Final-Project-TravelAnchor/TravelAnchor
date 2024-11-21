package travelanchor_server.area.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travelanchor_server.area.entity.Country;
import travelanchor_server.area.repository.CountryRepository;
import travelanchor_server.population.entity.Population;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryService {

    private static final Logger log = LoggerFactory.getLogger(CountryService.class);

    private final CountryRepository countryRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CountryService(CountryRepository countryRepository, ModelMapper modelMapper) {
        this.countryRepository = countryRepository;
        this.modelMapper = modelMapper;
    }

    public Object findCountry() {
        List<Country> countries = countryRepository.findAll();
        return countries.stream().map(Country -> modelMapper.map(Country, Country.class)).collect(Collectors.toList());
    }

    public Object findCountryCode(int countryCode) {
        log.info("[CountryService] findCountryCode() Start");
        Country country = countryRepository.findById(countryCode).get();

        log.info("[CountryService] findCountryCode() End");
        return modelMapper.map(country, Country.class);
    }
}
