package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travelanchor_server.member.dto.ChatMessageDTO;
import travelanchor_server.member.entity.Message;
import travelanchor_server.member.repository.MessageRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    private static final Logger log = LoggerFactory.getLogger(MessageService.class);
    private final MessageRepository messageRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public MessageService(MessageRepository messageRepository, ModelMapper modelMapper) {
        this.messageRepository = messageRepository;
        this.modelMapper = modelMapper;
    }

    public Object findMessages(int id) {
        log.info("[MessageService] findMessages() start");
        log.info("[MessageService] id : " +  id);

        List<Message> messages = messageRepository.findByChatroomCode(id);

        return messages.stream().map(message -> modelMapper.map(message, Message.class)).collect(Collectors.toList());
    }

    public Object insertMessages(ChatMessageDTO chat) {
        log.info("[MessageService] insertMessages() start");
        log.info("[MessageService] chat : " +  chat);
        int result = 0;
        try{

            Message insertMessage = modelMapper.map(chat, Message.class);

            insertMessage.setChatroomCode(chat.getChatroomCode());

            messageRepository.save(insertMessage);

            result = 1;
        } catch (Exception e) {

            throw new RuntimeException(e);
        }
        log.info("[MessageService] insertMessages() end");
        return (result > 0) ? "메세지 저장 성공" : "메세지 저장 실패";
    }

    public Object insertImageMessages(String imageUrl) {
        log.info("[MessageService] insertImageMessages() start");
        log.info("[MessageService] imageUrl : " +  imageUrl);
        int result = 0;
        try{

            Message insertMessage = new Message();

            log.info("insertMessage : " + insertMessage);



//            insertMessage.setChatroomCode(chat.getChatroomCode());
//
//            messageRepository.save(insertMessage);

            result = 1;
        } catch (Exception e) {

            throw new RuntimeException(e);
        }
        log.info("[MessageService] insertImageMessages() end");
        return (result > 0) ? "이미지 저장 성공" : "이미지 저장 실패";
    }
}
