package travelanchor_server.travelplan.dto;

public class TravelDayDTO {

    private int dayCode;
    private int travelCode;
    private int dayNumber;
    private int dayDate;

    public TravelDayDTO() {
    }

    public TravelDayDTO(int dayCode, int travelCode, int dayNumber, int dayDate) {
        this.dayCode = dayCode;
        this.travelCode = travelCode;
        this.dayNumber = dayNumber;
        this.dayDate = dayDate;
    }

    public int getDayCode() {
        return dayCode;
    }

    public void setDayCode(int dayCode) {
        this.dayCode = dayCode;
    }

    public int getTravelCode() {
        return travelCode;
    }

    public void setTravelCode(int travelCode) {
        this.travelCode = travelCode;
    }

    public int getDayNumber() {
        return dayNumber;
    }

    public void setDayNumber(int dayNumber) {
        this.dayNumber = dayNumber;
    }

    public int getDayDate() {
        return dayDate;
    }

    public void setDayDate(int dayDate) {
        this.dayDate = dayDate;
    }

    @Override
    public String toString() {
        return "TravelDayDTO{" +
                "dayCode=" + dayCode +
                ", travelCode=" + travelCode +
                ", dayNumber=" + dayNumber +
                ", dayDate=" + dayDate +
                '}';
    }
}
