package travelanchor_server.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import travelanchor_server.common.ChatMessage;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.member.repository.MessageRepository;
import travelanchor_server.member.service.MessageService;

import java.util.Date;
import java.util.List;

@RestController
//@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations template;

    private final MessageService messageService;

    @Autowired
    public ChatController(SimpMessageSendingOperations template, MessageService messageService) {
        this.template = template;
        this.messageService = messageService;
    }

    @GetMapping("/chat/{id}")
    public ResponseEntity<ResponseDTO> getChatMessages(@PathVariable int id){
//        System.out.println("id = " + id);
//        ChatMessage test = new ChatMessage(1L, "test", "test", 1, new Date());
//        return ResponseEntity.ok().body(List.of(test));
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "메세지 조회 성공", messageService.findMessages(id)));
    }

    @MessageMapping("/message")
    public ResponseEntity<Void> receiveMessage(@RequestBody ChatMessage chat) {
//        System.out.println("chat = " + chat);

        template.convertAndSend("/sub/chatroom/"+chat.getId(), chat);
        return ResponseEntity.ok().build();
    }

}
