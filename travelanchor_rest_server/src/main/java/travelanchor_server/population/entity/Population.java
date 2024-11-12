package travelanchor_server.population.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tbl_population")
public class Population {

    @Id
    @Column(name = "population_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int populationCode;

    @Column(name = "travel_code")
    private int travelCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "country_code")
    private int countryCode;

    @Column(name = "population_title")
    private String populationTitle;

    @Column(name = "population_description")
    private String populationDescription;

    @Column(name = "population_created_at")
    private Date populationCreatedAt;

    @Column(name = "population_views")
    private int populationViews;

    @Column(name = "population_people")
    private int populationPeople;

    @Column(name = "population_onoff")
    private String populationOnoff;

    public Population() {}

    public Population(int populationCode, int travelCode, int memberCode, int countryCode, String populationTitle, String populationDescription, Date populationCreatedAt, int populationViews, int populationPeople, String populationOnoff) {
        this.populationCode = populationCode;
        this.travelCode = travelCode;
        this.memberCode = memberCode;
        this.countryCode = countryCode;
        this.populationTitle = populationTitle;
        this.populationDescription = populationDescription;
        this.populationCreatedAt = populationCreatedAt;
        this.populationViews = populationViews;
        this.populationPeople = populationPeople;
        this.populationOnoff = populationOnoff;
    }

    public int getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(int countryCode) {
        this.countryCode = countryCode;
    }

    public int getPopulationCode() {
        return populationCode;
    }

    public void setPopulationCode(int populationCode) {
        this.populationCode = populationCode;
    }

    public int getTravelCode() {
        return travelCode;
    }

    public void setTravelCode(int travelCode) {
        this.travelCode = travelCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getPopulationTitle() {
        return populationTitle;
    }

    public void setPopulationTitle(String populationTitle) {
        this.populationTitle = populationTitle;
    }

    public String getPopulationDescription() {
        return populationDescription;
    }

    public void setPopulationDescription(String populationDescription) {
        this.populationDescription = populationDescription;
    }

    public Date getPopulationCreatedAt() {
        return populationCreatedAt;
    }

    public void setPopulationCreatedAt(Date populationCreatedAt) {
        this.populationCreatedAt = populationCreatedAt;
    }

    public int getPopulationViews() {
        return populationViews;
    }

    public void setPopulationViews(int populationViews) {
        this.populationViews = populationViews;
    }

    public int getPopulationPeople() {
        return populationPeople;
    }

    public void setPopulationPeople(int populationPeople) {
        this.populationPeople = populationPeople;
    }

    public String getPopulationOnoff() {
        return populationOnoff;
    }

    public void setPopulationOnoff(String populationOnoff) {
        this.populationOnoff = populationOnoff;
    }

    @Override
    public String toString() {
        return "PopulationDTO{" +
                "populationCode=" + populationCode +
                ", travelCode=" + travelCode +
                ", memberCode=" + memberCode +
                ", populationTitle='" + populationTitle + '\'' +
                ", populationDescription='" + populationDescription + '\'' +
                ", populationCreatedAt=" + populationCreatedAt +
                ", populationViews=" + populationViews +
                ", populationPeople=" + populationPeople +
                ", populationOnoff='" + populationOnoff + '\'' +
                '}';
    }
}
