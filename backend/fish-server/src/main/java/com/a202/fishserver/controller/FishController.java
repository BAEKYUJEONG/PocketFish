package com.a202.fishserver.controller;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.service.fish.FishService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/fish")
@AllArgsConstructor
@Api(value = "물고기 정보")
public class FishController {

    private final FishService fishService;

    @GetMapping("/{id}")
    @ApiOperation(value = "물고기별 정보 상세 조회")
    public Response getFishInfo(@PathVariable("id") long fishId) {
        HashMap<String, Object> result;
        try {
            result = fishService.getFishInfo(fishId);
        } catch (Exception e) {
            return Response.builder()
                    .status(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }

        return Response.builder()
                .status(true)
                .message("물고기별 상세 정보 조회 성공")
                .data(result)
                .build();
    }
}
