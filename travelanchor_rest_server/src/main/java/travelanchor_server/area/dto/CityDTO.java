package travelanchor_server.area.dto;

public class CityDTO {

    private int cityCode;
    private int countryCode;
    private String cityName;
    private String cityIataCode;

    public CityDTO() {
    }

    public CityDTO(int cityCode, int countryCode, String cityName, String cityIataCode) {
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
        return "CityDTO{" +
                "cityCode=" + cityCode +
                ", countryCode=" + countryCode +
                ", cityName='" + cityName + '\'' +
                ", cityIataCode='" + cityIataCode + '\'' +
                '}';
    }
}
