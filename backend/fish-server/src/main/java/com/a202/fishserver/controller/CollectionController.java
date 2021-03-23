package com.a202.fishserver.controller;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.collection.CollectionGetRequestDto;
import com.a202.fishserver.dto.collection.CollectionGetResponseDto;
import com.a202.fishserver.service.collection.CollectionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/collection")
@AllArgsConstructor
@Api(value = "물고기 도감 관리")
public class CollectionController {

    private final CollectionService collectionService;

    /**
     * 내 보관함 조회
     */
    @GetMapping
    @ApiOperation(value = "내 보관함 조회")
    public Response getMyCollection(@RequestBody CollectionGetRequestDto dto) {
        int userId = dto.getUser_id();
        List<CollectionGetResponseDto> result = collectionService.getMyCollections(userId);

        return Response.builder()
                .status(true)
                .message("물고기 전체 조회 성공")
                .data(result)
                .build();
    }
}
