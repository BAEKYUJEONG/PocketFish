package com.a202.fishserver.dto.collection;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CollectionGetDetailResponseDto {
    public Integer collectionId;
    public String fishName;
    public String fishImage;
    public Integer fishLength;
    public String fishLocation;
    public String fishMemo;
    public String fishBait;
    public String fishingInfo;
    public LocalDateTime regDate;

    @Builder
    public CollectionGetDetailResponseDto(Integer collectionId, String fishName, String fishImage, Integer fishLength, String fishLocation, String fishMemo, String fishBait, String fishingInfo, LocalDateTime regDate) {
        this.collectionId = collectionId;
        this.fishName = fishName;
        this.fishImage = fishImage;
        this.fishLength = fishLength;
        this.fishLocation = fishLocation;
        this.fishMemo = fishMemo;
        this.fishBait = fishBait;
        this.fishingInfo = fishingInfo;
        this.regDate = regDate;
    }
}
