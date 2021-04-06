package com.a202.fishserver.service.collection;

import com.a202.fishserver.dto.collection.CollectionPostRequestDto;
import com.a202.fishserver.dto.collection.CollectionPostTokenIDRequestDto;
import com.a202.fishserver.dto.collection.CollectionPostTokenRequestDto;

import java.util.HashMap;
import java.util.List;

public interface CollectionService {
    List<HashMap<String, Object>> getMyCollections(long userId) throws Exception;
    HashMap<String,Object> getCollectionDetail(long collectionId) throws Exception;
    void postCollection(CollectionPostRequestDto dto) throws Exception;
    void putCollection(CollectionPostRequestDto dto, long collectionId) throws Exception;
    void putCollectionFlag(long collectionID, CollectionPostTokenIDRequestDto dto) throws Exception;
}
