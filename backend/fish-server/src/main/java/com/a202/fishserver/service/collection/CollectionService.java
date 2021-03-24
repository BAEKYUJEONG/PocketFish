package com.a202.fishserver.service.collection;

import com.a202.fishserver.domain.collection.Collection;
import com.a202.fishserver.domain.collection.CollectionRepository;
import com.a202.fishserver.domain.fishImage.FishImage;
import com.a202.fishserver.domain.fishImage.FishImageRepository;
import com.a202.fishserver.domain.user.User;
import com.a202.fishserver.dto.collection.CollectionGetResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CollectionService {
    private final CollectionRepository collectionRepository;
    private final FishImageRepository fishImageRepository;

    /**
     * 내 보관함 조회
     */
    public List<CollectionGetResponseDto> getMyCollections(int userId){
        List<Collection> list = collectionRepository.findByUser(new User(userId));
        List<CollectionGetResponseDto> result = new ArrayList<>();

        for (Collection c : list) {
            Optional<FishImage> fishImage = fishImageRepository.findByCollection(c);
            String imagePath = "";
            if (fishImage.isPresent()) imagePath = fishImage.get().getImagePath();

            result.add(CollectionGetResponseDto.builder()
                    .collectionId(c.getId())
                    .fishImage(imagePath)
                    .build());
        }
        return result;
    }
}
