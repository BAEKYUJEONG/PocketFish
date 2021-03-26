package com.a202.fishserver.controller;

import com.a202.fishserver.domain.collection.Collection;
import com.a202.fishserver.domain.collection.CollectionRepository;
import com.a202.fishserver.domain.fish.Fish;
import com.a202.fishserver.domain.fish.FishRepository;
import com.a202.fishserver.domain.user.User;
import com.a202.fishserver.domain.user.UserRepository;
import com.a202.fishserver.dto.Response;
import lombok.AllArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/ranking")
@AllArgsConstructor
public class RankingController {

    private final UserRepository userRepository;
    private final FishRepository fishRepository;
    private final CollectionRepository collectionRepository;


    @GetMapping("/{fish_id}")
    public Object getRankByFishId(@PathVariable("fish_id") int fish_id) {
        List<JSONObject> result = new ArrayList<>();

        Optional<Fish> foundFish = fishRepository.findById(fish_id);

        if (foundFish.isPresent()) {
            Fish fish = foundFish.get();
            List<Collection> foundCollection = collectionRepository.findByFish(fish);

            for (Collection c : foundCollection) {
                JSONObject jobj = new JSONObject();
                Optional<User> foundUser = userRepository.findById(c.getUser().getId());
                User user = foundUser.get();

                jobj.put("nickname", user.getNickname());
                jobj.put("length", c.getLength());
                result.add(jobj);
            }
            Collections.sort(result, new Comparator<JSONObject>() {
                @Override
                public int compare(JSONObject o1, JSONObject o2) {
                    return (int)o2.get("length") - (int)o1.get("length");
                }
            });
        }

        return Response.builder()
                .status(true)
                .message("낚시 랭킹 불러오기 성공")
                .data(result)
                .build();
    }
}
