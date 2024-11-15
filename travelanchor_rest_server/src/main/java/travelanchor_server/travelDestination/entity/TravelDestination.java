package travelanchor_server.travelDestination.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_travel_destination_favorite")
public class TravelDestination {

    @Id
    @Column(name = "favorite_code")
    private int favoriteCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "api_link")
    private String  apiLink;

    @Column(name = "destination_name")
    private String destinationName;

    @Column(name = "destination_photos")
    private String destinationPhotos;

    public TravelDestination() {
    }

    public TravelDestination(int favoriteCode, int memberCode, String apiLink, String destinationName, String destinationPhotos) {
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
        return "TravelDestination{" +
                "favoriteCode=" + favoriteCode +
                ", memberCode=" + memberCode +
                ", apiLink='" + apiLink + '\'' +
                ", destinationName='" + destinationName + '\'' +
                ", destinationPhotos='" + destinationPhotos + '\'' +
                '}';
    }
}
