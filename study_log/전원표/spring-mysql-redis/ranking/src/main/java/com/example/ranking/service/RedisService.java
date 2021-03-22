package com.example.ranking.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class RedisService {
    @Value("${spring.redis.host}")
    private String redisHost;

    @Value("${spring.redis.port}")
    private int redisPort;

    @Resource(name = "redisTemplate")
    private ZSetOperations<String, String> zSetOperations;

    public void add() {
        try (Jedis jedis = new Jedis(redisHost, redisPort)) {
            Pipeline pipeline = jedis.pipelined();
            for (int i = 0; i < 10_000_000; i++) {
                pipeline.zadd("testfish", i * (int) (Math.random() * 10_000_000) + 1, String.valueOf(i * (int) (Math.random() * 10_000_000) + 1));
            }
            pipeline.sync();
        }
    }

    public List<String> getTopRanker(String zKey) {
        Set<String> range = zSetOperations.reverseRange(zKey, 0, 49999);
        return new ArrayList<>(range);
    }
}
