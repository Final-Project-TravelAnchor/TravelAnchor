package travelanchor_server.population.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PopulationService {

    private static final Logger log = LoggerFactory.getLogger(PopulationService.class);

    public Object selectProductListAboutMeal() {
        log.info("[ProductService] selectProductListAboutMeal() Start");

        List<Product> productListAboutMeal = productRepository.findByCategoryCode(1);

        for(int i = 0 ; i < productListAboutMeal.size() ; i++) {
            productListAboutMeal.get(i).setProductImageUrl(IMAGE_URL + productListAboutMeal.get(i).getProductImageUrl());
        }

        log.info("[ProductService] selectProductListAboutMeal() End");

        return productListAboutMeal.stream().map(product -> modelMapper.map(product, ProductDTO.class)).collect(Collectors.toList());
    }
}
