package travelanchor_server.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import travelanchor_server.common.ChatMessage;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.jwt.JwtFilter;
import travelanchor_server.member.dto.ChatMessageDTO;
import travelanchor_server.member.repository.MessageRepository;
import travelanchor_server.member.service.MessageService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
//@RequiredArgsConstructor
public class ChatController {

    @Value("${image.image-dir}")
    private String IMAGE_DIR;

    private final SimpMessageSendingOperations template;

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

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
    public ResponseEntity<ResponseDTO> receiveMessage(@RequestBody ChatMessageDTO chat) {
        System.out.println("chat = " + chat);

        if("IMAGE".equals(chat.getType())) {
            log.info("이미지 메시지 처리 : " + chat.getMessageContent());

        } else if("CHAT".equals(chat.getType())){
            log.info("채팅 메시지 처리 : " + chat.getMessageContent());
        }

        template.convertAndSend("/sub/chatroom/"+chat.getChatroomCode(), chat);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "메세지 저장 성공", messageService.insertMessages(chat)));
    }

    @PostMapping("/chat/upload/{id}")
    public ResponseEntity<ResponseDTO> uploadImage(@RequestParam("file") MultipartFile file,
                                                   @PathVariable int id){

//        log.info("data : " + data);
        log.info("file : " + file);
        log.info("fileOriginalFilename : " + file.getOriginalFilename());
        log.info("id : " + id);
//
//        return null;

//        String uploadDir = "uploads/";
        // 되는 거
//        String uploadDir = "src/main/resources/static/";
        // 테스트 중
//        String uploadDir = "build/resources/main/static/productimgs/";
        String uploadDir = IMAGE_DIR;
//        String uploadDir = "src/main/resources/static/";
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir);

        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.copy(file.getInputStream(), uploadPath.resolve(fileName));

            // URL 생성
//            String imageUrl = "/uploads/" + fileName;
//            String imageUrl = "/src/main/resources/static/" + fileName;
//            String imageUrl = "/Users/shinsaeng/Downloads/myWs/Git/TravelAnchor/travelanchor_rest_server/src/main/resources/static/" + fileName;
            String imageUrl = fileName;
//            String imageUrl = "/build/resources/main/static/" + fileName;
//
//
//            log.info("ImageUrl : " + imageUrl);
//            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "이미지 저장 성공", messageService.insertImageMessages(imageUrl)));

            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "이미지 업로드 성공", imageUrl));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드 실패", null));
        }
    }

}
