package travelanchor_server.population.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.population.dto.NoticeDTO;
import travelanchor_server.population.entity.Notice;
import travelanchor_server.population.repository.NoticeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoticeService {

    private static final Logger log = LoggerFactory.getLogger(NoticeService.class);

    private final NoticeRepository noticeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository, ModelMapper modelMapper) {
        this.noticeRepository = noticeRepository;
        this.modelMapper = modelMapper;
    }


    public Object findNoticeList() {
        log.info("[NoticeService] findNoticeList() Start");

        List<Notice> noticeList = noticeRepository.findByNoticeOnoff("Y");
        log.info("[NoticeService] noticeList = " + noticeList);

        log.info("[NoticeService] findNoticeList() End");

//        return modelMapper.map(populationList, Population.class);
        return noticeList.stream().map(notice -> modelMapper.map(notice, Notice.class)).collect(Collectors.toList());
    }

    @Transactional
    public Object insertNotice(NoticeDTO noticeDTO) {
        log.info("[NoticeService] insertNotice() Start");
        log.info("[NoticeService] noticeDTO : ", noticeDTO);
        int result = 0;

        try {
            Notice insertNotice = modelMapper.map(noticeDTO, Notice.class);

            noticeRepository.save(insertNotice);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[NoticeService] insertNotice() End");

        return (result > 0) ? "공지사항 입력 성공" : "공지사항 입력 실패";
    }

    @Transactional
    public Object updateNotice(NoticeDTO noticeDTO) {
        log.info("[NoticeService] updateNotice() Start");
        log.info("[NoticeService] noticeDTO : ", noticeDTO);
        int result = 0;

        try{

            Notice notice = noticeRepository.findById(noticeDTO.getNoticeCode()).get();

            notice.setNoticeContents(noticeDTO.getNoticeContents());
            notice.setNoticeName(noticeDTO.getNoticeName());

            noticeRepository.save(notice);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("[NoticeService] updateNotice() End");
        return (result > 0) ? "공지사항 수정 성공" : "공지사항 수정 실패";
    }

    @Transactional
    public Object updateNoticeViews(int noticeCode) {
        log.info("[NoticeService] updateNoticeViews() Start");
        int result = 0;

        try{

            Notice notice = noticeRepository.findById(noticeCode).get();
            System.out.println("notice = " + notice);

            notice.setNoticeViews(notice.getNoticeViews() + 1);

            noticeRepository.save(notice);

            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.info("[NoticeService] updateNoticeViews() End");
        return (result > 0) ? "공지사항 조회수 증가 성공" : "공지사항 조회수 증가 실패";
    }
}

