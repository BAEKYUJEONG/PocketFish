package com.a202.fishserver.service.comment;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.comment.CommentPostRequestDto;
import org.json.simple.JSONObject;

import java.util.List;

public interface CommentService {

    // NEED CHANGE IN COLLECTION ID <= CURRENT TYPE SET TO INTEGER
    List<JSONObject> getComments(int collectionId);

    Response writeComment(CommentPostRequestDto commentRequest);


}
