package com.example.ranking.controller;

import com.example.ranking.domain.Collection;
import com.example.ranking.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class CollectionController {
    private final CollectionService collectionService;

    @Autowired
    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping("/collection")
    @ResponseBody
    public List<Collection> readAllCollection() {
        return collectionService.readAll();
    }

    @PostMapping("/collection")
    @ResponseBody
    public long createCollection() {
        long randomFish = (long)(Math.random() * 20);
        long randomLength = (long)(Math.random() * 100);
        Collection collection = new Collection();
        collection.setFish_id(randomFish);
        collection.setLength(randomLength);
        return collectionService.create(collection);
    }
}
