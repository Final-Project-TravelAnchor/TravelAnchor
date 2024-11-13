package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.member.dto.DeclareDTO;
import travelanchor_server.member.entity.Declare;
import travelanchor_server.member.entity.Review;
import travelanchor_server.member.repository.DeclareRepository;
import travelanchor_server.member.repository.ReviewRepository;

@Service
public class DeclareService {

    private static final Logger log = LoggerFactory.getLogger(DeclareService.class);

    private final DeclareRepository declareRepository;
    private final ModelMapper modelMapper;

    public DeclareService(DeclareRepository declareRepository, ModelMapper modelMapper) {
        this.declareRepository = declareRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public Object insertMemberDeclare(DeclareDTO declareDTO) {

        log.info("[DeclareService] insertMemberDeclare() Start");
        log.info("[DeclareService] delcareDTO : ", declareDTO);
        int result = 0;

        try{

            Declare declare = modelMapper.map(declareDTO, Declare.class);

            declareRepository.save(declare);

            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[DeclareService] insertMemberDeclare() End");

        return (result > 0) ? "회원신고 작성 성공" : "회원신고 작성 실패";
    }
}
