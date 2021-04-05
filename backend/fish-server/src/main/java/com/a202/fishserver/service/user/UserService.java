package com.a202.fishserver.service.user;

import com.a202.fishserver.dto.user.UserPostRequestDto;

public interface UserService {
    void postUser(UserPostRequestDto dto) throws Exception;
    void putUserFlag(long userId, String accessToken) throws Exception;
    void putNickname(long userId, String nickname, String accessToken) throws Exception;
    long getUserIdByAccessToken(String acceessToken) throws Exception;
}
