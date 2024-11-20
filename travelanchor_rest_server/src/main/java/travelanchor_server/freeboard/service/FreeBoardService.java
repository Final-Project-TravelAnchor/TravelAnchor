package travelanchor_server.freeboard.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.freeboard.dto.FreeBoardDTO;
import travelanchor_server.freeboard.entity.FreeBoard;
import travelanchor_server.freeboard.repository.FreeBoardRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FreeBoardService {

    private static final Logger log = LoggerFactory.getLogger(FreeBoardService.class);

    private final FreeBoardRepository freeBoardRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public FreeBoardService(FreeBoardRepository freeBoardRepository, ModelMapper modelMapper) {
        this.freeBoardRepository = freeBoardRepository;
        this.modelMapper = modelMapper;
    }

    public Object findFreeBoardList() {

        log.info("[FreeBoardService] findFreeBoardList() Start");

        List<FreeBoard> freeBoardList = freeBoardRepository.findAll();
//        List<FreeBoardDTO> freeBoardDTOList = freeBoardList.stream()
//                .map(freeBoard -> modelMapper.map(freeBoard, FreeBoardDTO.class))
//                .collect(Collectors.toList());
        log.info("[FreeBoardService] freeBoardList = " + freeBoardList);

        log.info("[FreeBoardService] findFreeBoardList() End");

//        return modelMapper.map(freeBoardList, FreeBoard.class);
        return freeBoardList.stream().map(freeBoard -> modelMapper.map(freeBoard, FreeBoard.class)).collect(Collectors.toList());
    }

    public Object findFreeBoardDetail(int freeBoardCode) {
        log.info("[FreeBoardService] findFreeBoardDetail()");

        // 해당 Code의 여행 일정을 가져옴.
        FreeBoard freeBoard = freeBoardRepository.findById(freeBoardCode).get();

        return modelMapper.map(freeBoard, FreeBoard.class);
    }

    @Transactional
    public Object insertFreeBoard(FreeBoardDTO freeBoardDTO) {
        log.info("[FreeBoardService] insertFreeBoard() Start");
        log.info("[FreeBoardService] freeBoardDTO : " + freeBoardDTO);
        int result = 0;

        try {
            FreeBoard insertFreeBoard = modelMapper.map(freeBoardDTO, FreeBoard.class);

            freeBoardRepository.save(insertFreeBoard);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[FreeBoardService] insertFreeBoard() End");

        return (result > 0) ? "자유게시판 입력 성공" : "자유게시판 입력 실패";
    }

    @Transactional
    public Object updateFreeBoard(FreeBoardDTO freeBoardDTO) {
        log.info("[FreeBoardService] updateFreeBoard() Start");
        int result = 0;

        try{
            FreeBoard freeBoard = freeBoardRepository.findById(freeBoardDTO.getFreeBoardCode()).get();
            log.info("[FreeBoardService] freeBoard : " + freeBoard);
            freeBoard.setFreeBoardTitle(freeBoardDTO.getFreeBoardTitle());
            freeBoard.setFreeBoardContent(freeBoardDTO.getFreeBoardContent());

            System.out.println("freeBoard = " + freeBoard);

            freeBoardRepository.save(freeBoard);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[FreeBoardService] updateFreeBoard() End");
        return (result > 0) ? "자유게시판 수정 성공" : "자유게시판 수정 실패";
    }

    @Transactional
    public Object deleteFreeBoard(FreeBoardDTO freeBoardDTO) {
        log.info("[FreeBoardService] deleteFreeBoard() Start");
        int result = 0;

        try{
            FreeBoard freeBoard = freeBoardRepository.findById(freeBoardDTO.getFreeBoardCode()).get();
            log.info("[FreeBoardService] freeBoard : " + freeBoard);
            freeBoard.setFreeBoardIsdeleted(freeBoardDTO.getFreeBoardIsdeleted());

            System.out.println("freeBoard = " + freeBoard);

            freeBoardRepository.save(freeBoard);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[FreeBoardService] deleteFreeBoard() End");
        return (result > 0) ? "자유게시판 삭제 성공" : "자유게시판 삭제 실패";
    }
}
