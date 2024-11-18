package travelanchor_server.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatMessage {

    @JsonProperty
    private Long id;

    @JsonProperty
    private String name;

    @JsonProperty
    private String message;

    public ChatMessage(Long id, String name, String message) {
        this.id = id;
        this.name = name;
        this.message = message;
    }
}
