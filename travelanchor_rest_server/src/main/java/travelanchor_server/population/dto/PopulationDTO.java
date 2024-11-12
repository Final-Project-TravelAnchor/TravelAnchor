package travelanchor_server.population.dto;

import jakarta.persistence.*;

import java.util.Date;

public class PopulationDTO {

    private int populationCode;
    private int travelCode;
    private int memberCode;
    private String populationTitle;
    private String populationDescription;
    private Date populationCreatedAt;
    private int populationViews;
    private int populationPeople;
    private String populationOnoff;

    public PopulationDTO() {}

    public PopulationDTO(int populationCode, int travelCode, int memberCode, String populationTitle, String populationDescription, Date populationCreatedAt, int populationViews, int populationPeople, String populationOnoff) {
        this.populationCode = populationCode;
        this.travelCode = travelCode;
        this.memberCode = memberCode;
        this.populationTitle = populationTitle;
        this.populationDescription = populationDescription;
        this.populationCreatedAt = populationCreatedAt;
        this.populationViews = populationViews;
        this.populationPeople = populationPeople;
        this.populationOnoff = populationOnoff;
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
