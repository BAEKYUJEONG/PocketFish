package com.a202.fishserver.domain.comment;

import com.a202.fishserver.domain.collection.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByCollection(Optional<Collection> collection);
}
