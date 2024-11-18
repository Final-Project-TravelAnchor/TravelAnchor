package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travelanchor_server.member.entity.Message;
import travelanchor_server.member.repository.MessageRepository;
import travelanchor_server.member.repository.PointRepository;
import travelanchor_server.population.entity.Population;

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
}
