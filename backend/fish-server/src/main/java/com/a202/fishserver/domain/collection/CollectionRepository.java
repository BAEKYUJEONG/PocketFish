package com.a202.fishserver.domain.collection;

import com.a202.fishserver.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, Integer> {
    List<Collection> findByUser(User user);
}
