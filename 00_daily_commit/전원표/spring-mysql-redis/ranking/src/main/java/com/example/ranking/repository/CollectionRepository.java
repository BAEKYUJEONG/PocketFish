package com.example.ranking.repository;

import com.example.ranking.domain.Collection;

import java.util.List;
import java.util.Optional;

public interface CollectionRepository {
    Collection save(Collection collection);
    Optional<Collection> findById(long id);
    List<Collection> findAll();
}
