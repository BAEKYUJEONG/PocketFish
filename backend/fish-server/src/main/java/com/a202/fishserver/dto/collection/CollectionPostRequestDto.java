package com.a202.fishserver.dto.collection;

import lombok.Getter;

@Getter
public class CollectionPostRequestDto {
    public Integer length;
    public String location;
    public long fish_id;
    public String memo;
    public String bait;
    public String fishing_info;
    public long user_id;
    public String fish_image;
}
