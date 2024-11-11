package travelanchor_server.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("travelanchor_server")
public class TravelanchorRestServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelanchorRestServerApplication.class, args);
    }

}
