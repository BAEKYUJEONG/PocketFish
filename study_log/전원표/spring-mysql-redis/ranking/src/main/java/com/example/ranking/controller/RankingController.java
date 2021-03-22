package com.example.ranking.controller;

import com.example.ranking.domain.Collection;
import com.example.ranking.service.CollectionService;
import com.example.ranking.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class RankingController {
    private final CollectionService collectionService;
    private final RedisService redisService;

    @Autowired
    public RankingController(CollectionService collectionService, RedisService redisService) {
        this.collectionService = collectionService;
        this.redisService = redisService;
    }

    @GetMapping("/ranking")
    @ResponseBody
    public List<String> getRanking(){
        String zKey = "testfish";
        return redisService.getTopRanker(zKey);
    }
}
