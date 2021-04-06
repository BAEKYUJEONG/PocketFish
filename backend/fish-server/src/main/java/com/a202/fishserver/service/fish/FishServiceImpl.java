package com.a202.fishserver.service.fish;

import com.a202.fishserver.domain.fish.Fish;
import com.a202.fishserver.domain.fish.FishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FishServiceImpl implements FishService {

    private final FishRepository fishRepository;

    @Override
    public HashMap<String, Object> getFishInfo(long fishId) throws Exception {
        Optional<Fish> fish = fishRepository.findById(fishId);
        if (!fish.isPresent()) throw new Exception("물고기가 존재하지 않습니다.");

        HashMap<String, Object> map = new HashMap<>();
        map.put("id", fish.get().getId());
        map.put("name", fish.get().getName());
        map.put("length", fish.get().getFishLength());
        map.put("habitat", fish.get().getHabitat());
        map.put("activity", fish.get().getActivity());
        map.put("catch_ok", fish.get().isCatchOk());
        map.put("size_ok", fish.get().getSizeOk());
        map.put("poison", fish.get().isPoison());
        map.put("description", fish.get().getDescription());

        return map;
    }
}
