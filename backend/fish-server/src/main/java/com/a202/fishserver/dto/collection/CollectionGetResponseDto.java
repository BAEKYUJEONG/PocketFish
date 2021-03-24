package com.a202.fishserver.dto.collection;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CollectionGetResponseDto {
    public Integer collectionId;
    public String fishImage;

    @Builder
    public CollectionGetResponseDto(Integer collectionId, String fishImage) {
        this.collectionId = collectionId;
        this.fishImage = fishImage;
    }
}
