package com.a202.fishserver.service.collection;

import com.a202.fishserver.dto.collection.CollectionGetDetailResponseDto;
import com.a202.fishserver.dto.collection.CollectionGetResponseDto;
import com.a202.fishserver.dto.collection.CollectionPostRequestDto;

import java.util.List;

public interface CollectionService {
    List<CollectionGetResponseDto> getMyCollections(long userId);
    CollectionGetDetailResponseDto getCollectionDetail(int collectionId) throws Exception;
    void postCollection(CollectionPostRequestDto dto) throws Exception;
    void putCollection(CollectionPostRequestDto dto, int collectionId);

}
