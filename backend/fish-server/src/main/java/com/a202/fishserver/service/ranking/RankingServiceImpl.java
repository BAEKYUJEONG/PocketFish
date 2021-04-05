package com.a202.fishserver.service.ranking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service
public class RankingServiceImpl implements RankingService{

    @Autowired
    private RedisTemplate<String, String> template;

    @Resource()
    private ZSetOperations<String, String> zset;

    @Override
    public List<HashMap<String, Object>> getRankbyFishId(long fish_id) {

        Set<ZSetOperations.TypedTuple<String>> rankReverseSet = zset.reverseRangeWithScores("fish"+fish_id, 0 ,-1);

        List<HashMap<String, Object>> ranks = new ArrayList<>(rankReverseSet.size());
        Iterator<ZSetOperations.TypedTuple<String>> iterator = rankReverseSet.iterator();

        while (iterator.hasNext()) {
            ZSetOperations.TypedTuple<String> current = iterator.next();
            HashMap<String, Object> map = new HashMap<>();
            map.put(current.getValue(), current.getScore());
            ranks.add(map);
        }

        return ranks;
    }
}
