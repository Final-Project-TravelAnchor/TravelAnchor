package travelanchor_server.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import travelanchor_server.member.controller.FileUploadController;
import travelanchor_server.member.dto.MemberDTO;
import travelanchor_server.member.entity.Member;
import travelanchor_server.member.repository.MemberRepository;

import java.util.UUID;


@Service
public class MemberService {

    private static final Logger log = LoggerFactory.getLogger(MemberService.class);
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    /* 설명. 이미지 파일 저장 경로와 응답용 URL (WebConfig 설정파일 추가하기) */
    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public MemberService(MemberRepository memberRepository, ModelMapper modelMapper) {
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
    }

    public MemberDTO findMyInfo(String memberId) {
        log.info("[MemberService] getMyInfo Start =======================");

        Member member = memberRepository.findByMemberId(memberId);
        log.info("[MemberService] {}", member);
        log.info("[MemberService] getMyInfo End =========================");

        return modelMapper.map(member, MemberDTO.class);
    }

    @Transactional
    public Object updateMemberInfo(String memberId, MemberDTO memberDTO,  MultipartFile profilePhoto) {
        log.info("[MemberService] updateMyMemberInfo() start");
        log.info("[MemberService] memberId: " +  memberId);
        String replaceFileName = null;
        int result = 0;

        try {

            Member member = memberRepository.findByMemberId(memberId);
            String oriImage = member.getProfilePhoto();
            log.info("[MemberService] member: " + member);
            member.setMemberNickName(memberDTO.getMemberNickName());
//            member.setMemberPassword(memberDTO.getMemberPassword());
            member.setProfilePhoto((memberDTO.getProfilePhoto()));

            System.out.println("member = " + member);

            memberRepository.save(member);

            if(profilePhoto != null){
                String imageName = UUID.randomUUID().toString().replace("-", "");
                replaceFileName = FileUploadController.saveFile(IMAGE_DIR, imageName, profilePhoto);
                log.info("[updateProduct] InsertFileName : {}", replaceFileName);

                member.setProfilePhoto(replaceFileName);	// 새로운 파일 이름으로 update
                log.info("[updateProduct] deleteImage : {}", oriImage);

                boolean isDelete = FileUploadController.deleteFile(IMAGE_DIR, oriImage);
                log.info("[update] isDelete : {}", isDelete);
            } else {

                /* 설명. 이미지 변경 없을 경우 */
                member.setProfilePhoto(oriImage);
            }

            memberRepository.save(member);
            result = 1;
        } catch (Exception e) {
            throw new RuntimeException(e);

        }
        log.info("[MemberService] updateMemberInfo() End");
        return(result > 0) ? "회원정보 수정 성공" : "회원정보 수정 실패";
    }
}
