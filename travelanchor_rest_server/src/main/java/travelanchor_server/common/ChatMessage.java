package travelanchor_server.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class ChatMessage {

    @JsonProperty
    private Long id;

    @JsonProperty
    private String name;

    @JsonProperty
    private String message;

    @JsonProperty
    private int populationCode;

    @JsonProperty
    private String timestamp;

    public ChatMessage(Long id, String name, String message, int populationCode, String timestamp) {
        this.id = id;
        this.name = name;
        this.message = message;
        this.populationCode = populationCode;
        this.timestamp = timestamp;
    }

    public int getPopulationCode() {
        return populationCode;
    }

    public void setPopulationCode(int populationCode) {
        this.populationCode = populationCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTimeStamp() {
        return timestamp;
    }

    public void setTimeStamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", message='" + message + '\'' +
                ", populationCode=" + populationCode +
                ", timestamp=" + timestamp +
                '}';
    }
}

