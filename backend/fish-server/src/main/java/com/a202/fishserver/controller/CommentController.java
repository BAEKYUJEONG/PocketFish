package com.a202.fishserver.controller;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.comment.CommentPostRequestDto;
import com.a202.fishserver.dto.comment.CommentPutRequestDto;
import com.a202.fishserver.service.comment.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/collection/comment")
@AllArgsConstructor
public class CommentController {

    private final CommentService commentService;

    /**
     *
     * @param collectionId = a single collection Id
     * @return List of comments of a collection
     */
    @GetMapping("/{collectionId}")
    public Object getComments(@PathVariable("collectionId") int collectionId) {

        List<HashMap<String, Object>> tmp = commentService.getComments(collectionId);

        if (tmp.size() == 0) {
            return Response.builder()
                    .status(true)
                    .message("댓글 조회 실패")
                    .data(null)
                    .build();
        }
        return Response.builder()
                    .status(true)
                    .message("댓글 조회 성공")
                    .data(tmp)
                    .build();
    }

    /**
     *
     * @param commentRequest = incoming comment data to post
     * @return response
     */
    @PostMapping("/{collection_id}")
    public Object writeComment(@RequestBody CommentPostRequestDto commentRequest, @PathVariable("collection_id") long collection_id) {

        return commentService.writeComment(commentRequest);
    }

    /**
     *
     * @param updateRequest = (comment) id, content, updated_at, user_id, collection_id
     * @param collection_id = collection id
     * @param comment_id = comment id
     * @return response
     */
    @PutMapping("/{collection_id}/{comment_id}")
    public Object updateComment(@RequestBody CommentPutRequestDto updateRequest,
                                @PathVariable("collection_id") long collection_id,
                                @PathVariable("comment_id") long comment_id){
        return commentService.updateComment(updateRequest);
    }

    @PatchMapping("/{collection_id}/{comment_id}")
    public Object deleteComment(@PathVariable("collection_id") long collection_id,
                                @PathVariable("comment_id") long comment_id){
        return commentService.deleteComment(comment_id);
    }

}
