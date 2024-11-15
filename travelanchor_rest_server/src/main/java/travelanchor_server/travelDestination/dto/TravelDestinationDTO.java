package travelanchor_server.travelDestination.dto;

public class TravelDestinationDTO {

    private int favoriteCode;
    private int memberCode;
    private String apiLink;
    private String destinationName;
    private String destinationPhotos;

    public TravelDestinationDTO() {
    }

    public TravelDestinationDTO(int favoriteCode, int memberCode, String apiLink, String destinationName, String destinationPhotos) {
        this.favoriteCode = favoriteCode;
        this.memberCode = memberCode;
        this.apiLink = apiLink;
        this.destinationName = destinationName;
        this.destinationPhotos = destinationPhotos;
    }

    public int getFavoriteCode() {
        return favoriteCode;
    }

    public void setFavoriteCode(int favoriteCode) {
        this.favoriteCode = favoriteCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getApiLink() {
        return apiLink;
    }

    public void setApiLink(String apiLink) {
        this.apiLink = apiLink;
    }

    public String getDestinationName() {
        return destinationName;
    }

    public void setDestinationName(String destinationName) {
        this.destinationName = destinationName;
    }

    public String getDestinationPhotos() {
        return destinationPhotos;
    }

    public void setDestinationPhotos(String destinationPhotos) {
        this.destinationPhotos = destinationPhotos;
    }

    @Override
    public String toString() {
        return "TravelDestinationDTO{" +
                "favoriteCode=" + favoriteCode +
                ", memberCode=" + memberCode +
                ", apiLink='" + apiLink + '\'' +
                ", destinationName='" + destinationName + '\'' +
                ", destinationPhotos='" + destinationPhotos + '\'' +
                '}';
    }
}
