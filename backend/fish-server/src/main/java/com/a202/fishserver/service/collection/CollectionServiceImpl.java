package com.a202.fishserver.service.collection;

import com.a202.fishserver.domain.collection.Collection;
import com.a202.fishserver.domain.collection.CollectionRepository;
import com.a202.fishserver.domain.fish.Fish;
import com.a202.fishserver.domain.fish.FishRepository;
import com.a202.fishserver.domain.fishImage.FishImage;
import com.a202.fishserver.domain.fishImage.FishImageRepository;
import com.a202.fishserver.domain.user.User;
import com.a202.fishserver.domain.user.UserRepository;
import com.a202.fishserver.dto.collection.CollectionPostRequestDto;
import com.a202.fishserver.dto.collection.CollectionPostTestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CollectionServiceImpl implements CollectionService{
    private final CollectionRepository collectionRepository;
    private final FishImageRepository fishImageRepository;
    private final FishRepository fishRepository;
    private final UserRepository userRepository;

    /**
     * 내 보관함 조회
     */
    public List<HashMap<String, Object>> getMyCollections(long userId){
        List<Collection> list = collectionRepository.findByUser(new User(userId));
        List<HashMap<String, Object>> result = new ArrayList<>();

        for (Collection c : list) {
            // 삭제여부 true인 것은 list에 담지 않음
            if (c.getFlag()) continue;

            Optional<FishImage> fishImage = fishImageRepository.findByCollection(c);
            String imagePath = "";
            if (fishImage.isPresent()) imagePath = fishImage.get().getImagePath();

            HashMap<String, Object> map = new HashMap<>();
            map.put("collectionId", c.getId());
            map.put("fishImage", imagePath);
            result.add(map);
        }
        return result;
    }

    /**
     * 도감 상세 조회
     */
    public HashMap<String, Object> getCollectionDetail (long collectionId) throws Exception{
        Optional<Collection> collection = collectionRepository.findById(collectionId);
        if (!collection.isPresent()) throw new Exception("도감이 존재하지 않습니다.");

        Optional<FishImage> fishImage = fishImageRepository.findByCollection(collection.get());
        String imagePath = "";
        if (fishImage.isPresent()) imagePath = fishImage.get().getImagePath();

        HashMap<String, Object> map = new HashMap<>();
        map.put("collectionId", collectionId);
        map.put("fishName", collection.get().getFish().getName());
        map.put("fishImage", imagePath);
        map.put("fishLength", collection.get().getLength());
        map.put("fishLocation", collection.get().getLocation());
        map.put("fishMemo", collection.get().getMemo());
        map.put("fishBait", collection.get().getBait());
        map.put("fishingInfo", collection.get().getFishingInfo());
        map.put("regDate", collection.get().getRegDate());

        return map;
    }

    /**
     * 물고기 등록
     */
    public void postCollection(CollectionPostRequestDto dto) throws Exception{
        Optional<User> user = userRepository.findById(dto.getUser_id());
        Optional<Fish> fish = fishRepository.findById(dto.getFish_id());
        if (!user.isPresent()) throw new Exception("해당 사용자가 존재하지 않습니다.");
        if (!fish.isPresent()) throw new Exception("해당 물고기가 존재하지 않습니다.");

        collectionRepository.save(Collection.builder()
                                    .fish(fish.get())
                                    .bait(dto.getBait())
                                    .fishingInfo(dto.getFishing_info())
                                    .length(dto.getLength())
                                    .location(dto.getLocation())
                                    .memo(dto.getMemo())
                                    .user(user.get())
                                    .regDate(LocalDateTime.now())
                                    .flag(false)
                                    .build());
    }

    /**
     * 도감 정보 수정
     */
    public void putCollection(CollectionPostRequestDto dto, long collectionId) throws Exception{
        Optional<Collection> collection = collectionRepository.findById(collectionId);
        Optional<User> user = userRepository.findById(dto.getUser_id());
        Optional<Fish> fish = fishRepository.findById(dto.getFish_id());
        if (!collection.isPresent()) throw new Exception("해당 도감이 존재하지 않습니다.");
        if (!user.isPresent()) throw new Exception("해당 사용자가 존재하지 않습니다.");
        if (!fish.isPresent()) throw new Exception("해당 물고기가 존재하지 않습니다.");

        collectionRepository.save(Collection.builder()
                .id(collectionId)
                .fish(fish.get())
                .bait(dto.getBait())
                .fishingInfo(dto.getFishing_info())
                .length(dto.getLength())
                .location(dto.getLocation())
                .memo(dto.getMemo())
                .user(user.get())
                .regDate(LocalDateTime.now())
                .flag(false)
                .build());
    }

    /**
     * 도감 정보 삭제
     */
    @Override
    public void putCollectionFlag(long collectionID) throws Exception {
        Optional<Collection> collection = collectionRepository.findById(collectionID);
        if (!collection.isPresent()) throw new Exception("해당 도감 정보가 존재하지 않습니다.");

        collection.get().setFlag(true);
        collectionRepository.save(collection.get());
    }

    /**
     * 이미지 업로드 테스트
     */
    @Override
    public void uploadImage(CollectionPostTestDto dto) throws IOException {
        String rootPath = "/home/ubuntu/images/collection/";
        String apiPath = "https://j4a202.p.ssafy.io/images/collection/";
        MultipartFile file = dto.getFish_image();
        System.out.println("file " + file.getOriginalFilename());
        String filePath = rootPath + file.getOriginalFilename();
        File dest = new File(filePath);
        file.transferTo(dest);
    }

}
