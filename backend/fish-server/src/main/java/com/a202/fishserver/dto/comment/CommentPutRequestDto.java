package com.a202.fishserver.dto.comment;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class CommentPutRequestDto {

    public long id;
    public String content;
    public Date updated_at;
    public long user_id;
    public long collection_id;

}
