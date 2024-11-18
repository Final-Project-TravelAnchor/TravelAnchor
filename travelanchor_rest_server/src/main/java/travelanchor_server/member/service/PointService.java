package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelanchor_server.member.dto.PointDTO;
import travelanchor_server.member.entity.Member;
import travelanchor_server.member.entity.Point;
import travelanchor_server.member.repository.PointRepository;

@Service
public class PointService {

    private static final Logger log = LoggerFactory.getLogger(PointService.class);
    private final PointRepository pointRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PointService(PointRepository pointRepository, ModelMapper modelMapper) {
        this.pointRepository = pointRepository;
        this.modelMapper = modelMapper;
    }

    public Object findMemberPoint(int memberCode) {
        log.info("[PointService] findMemberPoint() start");
        log.info("[PointService] memberCode: " +  memberCode);

        Point point = pointRepository.findByMemberCode(memberCode);
        log.info("[PointService] memberPoint: " + point);
        return modelMapper.map(point, PointDTO.class);
    }

    @Transactional
    public Object updateMemberPoint(int memberCode, PointDTO pointDTO) {
        log.info("[PointService] updateMemberPoint() start");
        log.info("[PointService] memberCode: " +  memberCode);
        log.info("[PointService] pointDTO: " +  pointDTO);

        int result = 0;

        try{

            Point point = pointRepository.findByMemberCode(memberCode);
            log.info("[PointPlanService] point : " + point);
            point.setPointRewardTotalCount(point.getPointRewardTotalCount() + 1);
            point.setPointRewardPoint(point.getPointRewardPoint() + pointDTO.getPointRewardPoint());

            log.info("[PointPlanService] changed point : " + point);

            pointRepository.save(point);

            result = 1;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        log.info("[PointService] updateMemberPoint() end");
        return (result > 0) ? "점수 조회 수정 성공" : "점수 조회 수정 실패";
    }
}
