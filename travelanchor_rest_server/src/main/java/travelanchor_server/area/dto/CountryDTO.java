package travelanchor_server.area.dto;

public class CountryDTO {

    private int countryCode;
    private String countryName;

    public CountryDTO() {
    }

    public CountryDTO(int countryCode, String countryName) {
        this.countryCode = countryCode;
        this.countryName = countryName;
    }

    public int getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(int countryCode) {
        this.countryCode = countryCode;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    @Override
    public String toString() {
        return "CountryDTO{" +
                "countryCode=" + countryCode +
                ", countryName='" + countryName + '\'' +
                '}';
    }
}