package travelanchor_server.area.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_travel_city")
public class City {

    @Id
    @Column(name = "city_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cityCode;

    @Column(name = "country_code")
    private int countryCode;

    @Column(name = "city_name")
    private String cityName;

    @Column(name = "city_iata_code")
    private String cityIataCode;

    public City() {
    }

    public City(int cityCode, int countryCode, String cityName, String cityIataCode) {
        this.cityCode = cityCode;
        this.countryCode = countryCode;
        this.cityName = cityName;
        this.cityIataCode = cityIataCode;
    }

    public int getCityCode() {
        return cityCode;
    }

    public void setCityCode(int cityCode) {
        this.cityCode = cityCode;
    }

    public int getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(int countryCode) {
        this.countryCode = countryCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getCityIataCode() {
        return cityIataCode;
    }

    public void setCityIataCode(String cityIataCode) {
        this.cityIataCode = cityIataCode;
    }

    @Override
    public String toString() {
        return "City{" +
                "cityCode=" + cityCode +
                ", countryCode=" + countryCode +
                ", cityName='" + cityName + '\'' +
                ", cityIataCode='" + cityIataCode + '\'' +
                '}';
    }
}
