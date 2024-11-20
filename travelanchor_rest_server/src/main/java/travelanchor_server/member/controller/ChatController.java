package travelanchor_server.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import travelanchor_server.common.ChatMessage;
import travelanchor_server.common.ResponseDTO;
import travelanchor_server.member.dto.ChatMessageDTO;
import travelanchor_server.member.repository.MessageRepository;
import travelanchor_server.member.service.MessageService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public ResponseEntity<ResponseDTO> receiveMessage(@RequestBody ChatMessageDTO chat) {
        System.out.println("chat = " + chat);

        template.convertAndSend("/sub/chatroom/"+chat.getChatroomCode(), chat);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "메세지 저장 성공", messageService.insertMessages(chat)));
    }

    @PostMapping("/chat/upload-image")
    public ResponseEntity<ResponseDTO> uploadImage(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDTO(HttpStatus.BAD_REQUEST, "이미지 파일이 없습니다.", null));
        }

        try {
            // 파일을 저장할 경로를 지정 (이 경로는 환경에 맞게 변경 가능)
            String uploadDirectory = "uploads/";
            Path uploadPath = Paths.get(uploadDirectory);

            // 디렉토리가 없으면 생성
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 파일 저장
            String fileName = file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            file.transferTo(filePath.toFile());

            // 필요한 경우 이 정보를 데이터베이스에 저장하거나 메시지를 통해 사용자에게 알림
            String imageUrl = "/uploads/" + fileName; // 프론트에서 접근 가능한 경로

            // 예시 응답
            return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "이미지 업로드 성공", imageUrl));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드 중 오류 발생", null));
        }
    }

}
