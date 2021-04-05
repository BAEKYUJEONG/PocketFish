package com.a202.fishserver.service.user;


import com.a202.fishserver.domain.user.User;
import com.a202.fishserver.domain.user.UserRepository;
import com.a202.fishserver.dto.user.UserPostRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    /**
     * 사용자 등록
     */
    @Override
    public void postUser(UserPostRequestDto dto) throws Exception {
        Optional<User> user = userRepository.findById(dto.getId());
        if (user.isPresent() && !user.get().isFlag()) throw new Exception("이미 가입된 사용자입니다.");

        try {
            userRepository.save(User.builder()
                    .id(dto.getId())
                    .nickname(dto.getNickname())
                    .email(dto.getEmail())
                    .picture(dto.getPicture())
                    .flag(false)
                    .build());
        } catch (Exception e) {
            throw new Exception("사용자 등록 중 오류 발생");
        }
    }

    /**
     * 닉네임 정보 수정
     */
    @Override
    public void putNickname(long userId, String nickname, String accessToken) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) throw new Exception("해당 사용자가 존재하지 않습니다.");
        if (user.get().isFlag()) throw new Exception("탈퇴한 사용자입니다.");
        if (userId != getUserIdByAccessToken(accessToken)) throw new Exception("올바른 사용자가 아닙니다.");

        user.get().setNickname(nickname);
        userRepository.save(user.get());
    }

    /**
     * 사용자 탈퇴
     */
    @Override
    public void putUserFlag(long userId, String accessToken) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) throw new Exception("해당 사용자가 존재하지 않습니다.");
        if (userId != getUserIdByAccessToken(accessToken)) throw new Exception("올바른 사용자가 아닙니다.");

        user.get().setFlag(true);
        userRepository.save(user.get());
    }

    /**
     * 사용자 정보 조회
     */
    @Override
    public HashMap<String, Object> getUser(long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) throw new Exception("해당 사용자가 존재하지 않습니다.");

        HashMap<String, Object> map = new HashMap<>();
        map.put("id", user.get().getId());
        map.put("email", user.get().getEmail());
        map.put("nickname", user.get().getNickname());
        map.put("picture", user.get().getPicture());
        return map;
    }

    /**
     * 토큰 유효성 검사
     */
    @Override
    public long getUserIdByAccessToken(String acceessToken) throws Exception {
        String url = "https://kapi.kakao.com/v2/user/me";
        String headerValue = "Bearer " + acceessToken;
        long id;

        try {
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
            factory.setConnectTimeout(5000);
            factory.setReadTimeout(5000);
            RestTemplate restTemplate = new RestTemplate(factory);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", headerValue);
            HttpEntity<?> entity = new HttpEntity<>(headers);
            ResponseEntity<HashMap> resultMap = restTemplate.exchange(url, HttpMethod.GET, entity, HashMap.class);

            // 전체 결과 볼 때 사용
            // ObjectMapper mapper = new ObjectMapper();
            // result = mapper.writeValueAsString(resultMap.getBody());

            try {
                id = Long.parseLong(resultMap.getBody().get("id").toString());
            } catch (Exception e) {
                throw new Exception("토큰 id 없음");
            }

        } catch (Exception e) {
            throw new Exception("토큰 유효성 검사 실패");
        }
        return id;
    }
}
