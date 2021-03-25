package com.a202.fishserver.controller;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.collection.CollectionGetDetailResponseDto;
import com.a202.fishserver.dto.collection.CollectionGetRequestDto;
import com.a202.fishserver.dto.collection.CollectionGetResponseDto;
import com.a202.fishserver.dto.collection.CollectionPostRequestDto;
import com.a202.fishserver.service.collection.CollectionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        long userId = dto.getUser_id();
        List<CollectionGetResponseDto> result = collectionService.getMyCollections(userId);

        return Response.builder()
                .status(true)
                .message("물고기 전체 조회 성공")
                .data(result)
                .build();
    }

    /**
     * 도감 상세보기
     */
    @GetMapping("/{id}")
    @ApiOperation(value = "도감 상세보기")
    public Response getCollectionDetail(@PathVariable("id") int collectionId) {
        CollectionGetDetailResponseDto result;
        try {
            result = collectionService.getCollectionDetail(collectionId);
        } catch (Exception e) {
            return Response.builder()
                    .status(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
        return Response.builder()
                .status(true)
                .message("물고기 상세 조회 성공")
                .data(result)
                .build();
    }

    /**
     * 물고기 등록
     */
    @PostMapping
    @ApiOperation(value = "물고기 등록")
    public Response postCollection(@RequestBody CollectionPostRequestDto dto) {
        try {
            collectionService.postCollection(dto);
        } catch (Exception e) {
            return Response.builder()
                    .status(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
        return Response.builder()
                .status(true)
                .message("물고기 등록 성공")
                .data(null)
                .build();
    }
}
