package com.a202.fishserver.domain.collection;

import com.a202.fishserver.domain.fish.Fish;
import com.a202.fishserver.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Integer length;
    private String location;

    @ManyToOne
    private Fish fish;

    private String memo;
    private String bait;
    private String fishingInfo;
    private LocalDateTime regDate;
    private Boolean flag;

    @ManyToOne
    private User user;

    public Collection(long id) {
        this.id = id;
    }

    @Builder
    public Collection(long id, Integer length, String location, Fish fish, String memo, String bait, String fishingInfo, LocalDateTime regDate, Boolean flag, User user) {
        this.id = id;
        this.length = length;
        this.location = location;
        this.fish = fish;
        this.memo = memo;
        this.bait = bait;
        this.fishingInfo = fishingInfo;
        this.regDate = regDate;
        this.flag = flag;
        this.user = user;
    }
}
