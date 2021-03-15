package com.example.ranking.service;

import com.example.ranking.domain.Collection;
import com.example.ranking.repository.CollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CollectionService {
    private final CollectionRepository collectionRepository;

    @Autowired
    public CollectionService(CollectionRepository collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    public long create(Collection collection) {
        this.collectionRepository.save(collection);
        return collection.getId();
    }

    public Optional<Collection> read(long collectionId) {
        return this.collectionRepository.findById(collectionId);
    }

    public List<Collection> readAll() {
        return this.collectionRepository.findAll();
    }
}
