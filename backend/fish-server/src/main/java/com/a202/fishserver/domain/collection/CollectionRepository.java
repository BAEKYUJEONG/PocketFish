package com.a202.fishserver.domain.collection;

import com.a202.fishserver.domain.fish.Fish;
import com.a202.fishserver.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, Long> {
    List<Collection> findByUser(User user);

    List<Collection> findByFish(Fish fish);
}
