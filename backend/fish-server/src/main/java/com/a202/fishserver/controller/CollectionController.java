package com.a202.fishserver.controller;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.collection.CollectionPostRequestDto;
import com.a202.fishserver.dto.collection.CollectionPostTestDto;
import com.a202.fishserver.service.collection.CollectionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/collection")
@AllArgsConstructor
@Api(value = "물고기 도감 관리")
public class CollectionController {

    private final CollectionService collectionService;

    /**
     * 내 보관함 조회
     */
    @GetMapping("/user/{id}")
    @ApiOperation(value = "내 보관함 조회")
    public Response getMyCollection(@PathVariable("id") long userId) {
        List<HashMap<String, Object>> result = collectionService.getMyCollections(userId);

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
    public Response getCollectionDetail(@PathVariable("id") long collectionId) {
        HashMap<String, Object> result;
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

    /**
     * 이미지 업로드 테스트
     */
    @PostMapping("/test")
    public void uploadImage(@ModelAttribute CollectionPostTestDto dto) {
        try {
            collectionService.uploadImage(dto);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

    /**
     * 도감 정보 수정
     */
    @PutMapping("/{id}")
    @ApiOperation(value = "도감 정보 수정")
    public Response putCollection(@RequestBody CollectionPostRequestDto dto, @PathVariable("id") long collectionId) {
        try {
            collectionService.putCollection(dto, collectionId);
        } catch (Exception e) {
            return Response.builder()
                    .status(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
        return Response.builder()
                .status(true)
                .message("도감 정보 수정 성공")
                .data(null)
                .build();
    }

    /**
     * 도감 정보 삭제
     */
    @DeleteMapping("/{id}")
    @ApiOperation(value = "도감 정보 삭제")
    public Response putCollectionFlag(@PathVariable("id") long collectionId) {
        try {
            collectionService.putCollectionFlag(collectionId);
        } catch (Exception e) {
            return Response.builder()
                    .status(false)
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
        return Response.builder()
                .status(true)
                .message("도감 정보 삭제 성공")
                .data(null)
                .build();
    }
}
