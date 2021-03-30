package com.a202.fishserver.service.comment;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.comment.CommentPostRequestDto;
import com.a202.fishserver.dto.comment.CommentPutRequestDto;
import org.json.simple.JSONObject;

import java.util.HashMap;
import java.util.List;

public interface CommentService {


    List<HashMap<String, Object>> getComments(long collectionId);
    Response writeComment(CommentPostRequestDto writeRequest);
    Response updateComment(CommentPutRequestDto updateRequest);
    Response deleteComment(long comment_id);

}
