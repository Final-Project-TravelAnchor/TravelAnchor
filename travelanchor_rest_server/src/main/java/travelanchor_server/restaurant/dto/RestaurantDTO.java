package travelanchor_server.restaurant.dto;

public class RestaurantDTO {

    private int favoriteCode;
    private int memberCode;
    private String apiLink;
    private String restaurantName;
    private String restaurantPhotos;
    private String placeType;

    public RestaurantDTO() {
    }

    public RestaurantDTO(int favoriteCode, int memberCode, String apiLink, String restaurantName, String restaurantPhotos, String placeType) {
        this.favoriteCode = favoriteCode;
        this.memberCode = memberCode;
        this.apiLink = apiLink;
        this.restaurantName = restaurantName;
        this.restaurantPhotos = restaurantPhotos;
        this.placeType = placeType;
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

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getRestaurantPhotos() {
        return restaurantPhotos;
    }

    public void setRestaurantPhotos(String restaurantPhotos) {
        this.restaurantPhotos = restaurantPhotos;
    }

    public String getPlaceType() {
        return placeType;
    }

    public void setPlaceType(String placeType) {
        this.placeType = placeType;
    }

    @Override
    public String toString() {
        return "RestaurantDTO{" +
                "favoriteCode=" + favoriteCode +
                ", memberCode=" + memberCode +
                ", apiLink='" + apiLink + '\'' +
                ", restaurantName='" + restaurantName + '\'' +
                ", restaurantPhotos='" + restaurantPhotos + '\'' +
                ", placeType='" + placeType + '\'' +
                '}';
    }
}
