package com.a202.fishserver.controller;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.comment.CommentPostRequestDto;
import com.a202.fishserver.service.comment.CommentService;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/collection/comment")
public class CommentController {

    private final CommentService commentService;
    
    // 생성자 주입
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    /**
     *
     * @param collectionId = a single collection Id
     * @return List of comments of a collection
     */
    @GetMapping("/{collectionId}")
    public Object getComments(@PathVariable("collectionId") int collectionId) {
        List<JSONObject> commentResult = commentService.getComments(collectionId);

        if (commentResult.size() == 0) {
            return Response.builder()
                    .status(true)
                    .message("댓글 조회 실패")
                    .data(null)
                    .build();
        }
        return Response.builder()
                    .status(true)
                    .message("댓글 조회 성공")
                    .data(commentResult)
                    .build();
    }

    /**
     *
     * @param commentRequest = incoming comment data to post
     * @return response
     */
    @PostMapping("/{collectionId}")
    public Object writeComment(@RequestBody CommentPostRequestDto commentRequest) {

        Response response = commentService.writeComment(commentRequest);
        return response;
    }

}
