package com.a202.fishserver.dto.comment;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class CommentPostRequestDto {

    public String content;
    public Date reg_date;
    public long user_Id;
    public int collectionId;

}
