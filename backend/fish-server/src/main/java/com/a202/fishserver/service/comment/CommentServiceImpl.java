package com.a202.fishserver.service.comment;

import com.a202.fishserver.domain.collection.Collection;
import com.a202.fishserver.domain.collection.CollectionRepository;
import com.a202.fishserver.domain.comment.Comment;
import com.a202.fishserver.domain.comment.CommentRepository;
import com.a202.fishserver.domain.user.User;
import com.a202.fishserver.domain.user.UserRepository;
import com.a202.fishserver.dto.Response;
import com.a202.fishserver.dto.comment.CommentPostRequestDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final CollectionRepository collectionRepository;
    private final UserRepository userRepository;


    @Override
    public List<JSONObject> getComments(int collectionId) {

        List<JSONObject> result = new ArrayList<>();
        Optional<Collection> collection = collectionRepository.findById(collectionId);
        if (collection.isPresent()) {
            List<Comment> comments = commentRepository.findByCollection(collection);
            for (Comment c : comments) {
                JSONObject comment = new JSONObject();

                comment.put("nickname", c.getUser().getNickname());
                comment.put("content", c.getContent());
                comment.put("regDate", c.getReg_date());
                comment.put("updatedAt", c.getUpdated_at());

//                System.out.println(comment.toString());

                result.add(comment);
            }
            return result;
        }

        return null;
    }

    @Override
    public Response writeComment(CommentPostRequestDto dto) {

        Optional<User> user = userRepository.findById(dto.getUser_Id());
        Optional<Collection> collection = collectionRepository.findById(dto.getCollectionId());

        if (user.isPresent() && collection.isPresent()) {

            Comment comment = new Comment();
//            BeanUtils.copyProperties(dto, comment);

            comment.setContent(dto.getContent());
            comment.setReg_date(dto.getReg_date());
            comment.setCollection(collection.get());
            comment.setUser(user.get());

            System.out.println("Comment to post: " + comment.toString());

            comment = commentRepository.save(comment);

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
}
