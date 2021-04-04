package com.a202.fishserver.controller;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.user.UserPostRequestDto;
import com.a202.fishserver.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/user")
@AllArgsConstructor
@Api(value = "사용자 관리")
public class UserController {

    private final UserService userService;

    /**
     * 사용자 등록
     */
    @PostMapping("/")
    @ApiOperation(value = "사용자 등록")
    public Response postUser(@ModelAttribute UserPostRequestDto userDto) {
        try {
            userService.postUser(userDto);
        } catch (Exception e) {
            return Response.builder()
                    .status(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
        return Response.builder()
                .status(true)
                .message("사용자 등록 성공")
                .data(null)
                .build();
    }

    /**
     * 사용자 탈퇴
     */
    @DeleteMapping("/{id}")
    @ApiOperation(value = "사용자 탈퇴")
    public Response putUserFlag(@PathVariable("id") long userId,
                                @RequestBody String accessToken) {

        try {
            userService.putUserFlag(userId, accessToken);
        } catch (Exception e) {
            return Response.builder()
                    .status(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
        return Response.builder()
                .status(true)
                .message("사용자 탈퇴 성공")
                .data(null)
                .build();
    }

    /**
     * 오큰 유효성 검사
     * 배포시 삭제 예정
     */
    @PostMapping("/chkAccess")
    @ApiOperation(value = "토큰 유효성 검사")
    public Response getUserIdByAccessToken(@RequestBody String accessToken) {
        long id;
        try {
            id = userService.getUserIdByAccessToken(accessToken);
        } catch (Exception e) {
            return Response.builder()
                    .status(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }

        return Response.builder()
                .status(true)
                .message("토큰 유효성 검사 성공")
                .data(id)
                .build();
    }
}