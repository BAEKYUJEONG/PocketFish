package com.a202.fishserver.dto.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserPostRequestDto {
    private long id;
    private String email;
    private String nickname;
    private String picture;
    private boolean flag;
}
