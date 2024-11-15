package travelanchor_server.area.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_travel_country")
public class Country {

    @Id
    @Column(name = "country_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int countryCode;

    @Column(name = "country_name")
    private String countryName;

    public Country() {
    }

    public Country(int countryCode, String countryName) {
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
        return "Country{" +
                "countryCode=" + countryCode +
                ", countryName='" + countryName + '\'' +
                '}';
    }
}
