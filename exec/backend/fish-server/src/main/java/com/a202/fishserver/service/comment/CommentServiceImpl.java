package com.a202.fishserver.service.comment;

import com.a202.fishserver.domain.collection.Collection;
import com.a202.fishserver.domain.collection.CollectionRepository;
import com.a202.fishserver.domain.comment.Comment;
import com.a202.fishserver.domain.comment.CommentRepository;
import com.a202.fishserver.domain.user.User;
import com.a202.fishserver.domain.user.UserRepository;
import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.comment.CommentPostRequestDto;
import com.a202.fishserver.dto.comment.CommentPutRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final CollectionRepository collectionRepository;
    private final UserRepository userRepository;


    @Override
    public List<HashMap<String, Object>> getComments(long collectionId) {

        List<HashMap<String, Object>> result = new ArrayList<>();

        Optional<Collection> collection = collectionRepository.findById(collectionId);
        if (collection.isPresent()) {
            List<Comment> comments = commentRepository.findByCollection(collection);
            for (Comment c : comments) {

                HashMap<String, Object> comment = new HashMap<>();
                comment.put("nickname", c.getUser().getNickname());
                comment.put("content", c.getContent());
                comment.put("reg_date", c.getReg_date());
                comment.put("updated_at", c.getUpdated_at());

                result.add(comment);
            }
            return result;
        }
        return null;
    }

    @Override
    public Response writeComment(CommentPostRequestDto writeRequest) {

        Optional<User> user = userRepository.findById(writeRequest.getUser_id());
        Optional<Collection> collection = collectionRepository.findById(writeRequest.getCollection_id());

        if (user.isPresent() && collection.isPresent()) {

            Comment comment = new Comment();

            comment.setContent(writeRequest.getContent());
            comment.setReg_date(writeRequest.getReg_date());
            comment.setCollection(collection.get());
            comment.setUser(user.get());
            comment.setFlag(true);

            System.out.println("Comment to post: " + comment.toString());

            commentRepository.save(comment);

            return Response.builder()
                    .status(true)
                    .message("댓글 등록 성공")
                    .data(null)
                    .build();
        }
        return Response.builder()
                .status(false)
                .message("댓글 등록 실패")
                .data(null)
                .build();

    }

    @Override
    public Response updateComment(CommentPutRequestDto updateRequest) {

        Optional<Comment> foundComment = commentRepository.findById(updateRequest.getId());
        if (foundComment.isPresent()) {
            Comment comment = foundComment.get();

            comment.setContent(updateRequest.getContent());
            comment.setUpdated_at(updateRequest.getUpdated_at());

            System.out.println("Updated comment: "+comment.toString());

            commentRepository.save(comment);

            return Response.builder()
                    .status(true)
                    .message("댓글 수정 성공")
                    .data(null)
                    .build();

        }
        return Response.builder()
                .status(false)
                .message("댓글 수정 실패")
                .data(null)
                .build();
    }

    @Override
    public Response deleteComment(long comment_id) {
        Optional<Comment> foundComment = commentRepository.findById(comment_id);
        if (foundComment.isPresent()) {
            Comment comment = foundComment.get();
            comment.setFlag(false);
            commentRepository.save(comment);
            
            return Response.builder()
                    .status(true)
                    .message("댓글 삭제 성공")
                    .data(null)
                    .build();
        }
        return Response.builder()
                .status(false)
                .message("댓글 삭제 실패")
                .data(null)
                .build();
    }


}
