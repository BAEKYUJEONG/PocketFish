package com.a202.fishserver.service.collection;

import com.a202.fishserver.dto.collection.CollectionPostRequestDto;
import com.a202.fishserver.dto.collection.CollectionPostTestDto;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public interface CollectionService {
    List<HashMap<String, Object>> getMyCollections(long userId);
    HashMap<String,Object> getCollectionDetail(long collectionId) throws Exception;
    void postCollection(CollectionPostRequestDto dto) throws Exception;
    void putCollection(CollectionPostRequestDto dto, long collectionId) throws Exception;
    void putCollectionFlag(long collectionID) throws Exception;
    void uploadImage(CollectionPostTestDto dto) throws IOException;
}
