package com.a202.fishserver.service.ranking;

import com.a202.fishserver.domain.collection.Collection;
import com.a202.fishserver.domain.collection.CollectionRepository;
import com.a202.fishserver.domain.fish.Fish;
import com.a202.fishserver.domain.fish.FishRepository;
import com.a202.fishserver.domain.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service
@AllArgsConstructor
public class RankingServiceImpl implements RankingService{

    private final UserRepository userRepository;
    private final CollectionRepository collectionRepository;
    private final FishRepository fishRepository;

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

            String[] user_info = current.getValue().split(";");

            map.put("collection_id", user_info[0]);
            map.put("user_id", user_info[1]);
            map.put("nickname", user_info[2]);
            map.put("length", current.getScore());

            ranks.add(map);
        }

        return ranks;
    }

    @Override
    public void reEnrollRanks() {

        List<HashMap<String, Object>> ranks = new ArrayList<>();
        List<Fish> fishes = fishRepository.findAll();
        for (Fish fish : fishes) {
            List<Collection> collections = collectionRepository.findByFish(fish);

            for (Collection c : collections) {
                System.out.println("== 랭킹 재등록==");
                ZSetOperations<String, String> zset = template.opsForZSet();
                System.out.println("zset created");

                zset.add("fish"+fish.getId(), c.getId()+";"+c.getUser().getNickname()+";"+c.getUser().getId(), c.getLength());
                System.out.println("zset added: "+ c.getId()+";"+c.getUser().getNickname()+";"+c.getUser().getId() + "= " +c.getLength());
            }
        }

    }
}
