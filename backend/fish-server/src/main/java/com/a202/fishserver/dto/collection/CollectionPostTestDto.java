package com.a202.fishserver.dto.collection;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@ToString
@Getter
@Setter
public class CollectionPostTestDto {
    public MultipartFile fish_image;
}
