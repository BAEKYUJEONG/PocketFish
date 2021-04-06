package com.a202.fishserver.dto.collection;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CollectionPostTokenIDRequestDto {
    public long user_id;
    public String user_token;
}
