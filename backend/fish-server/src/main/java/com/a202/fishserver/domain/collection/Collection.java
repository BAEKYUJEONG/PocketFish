package com.a202.fishserver.domain.collection;

import com.a202.fishserver.domain.fish.Fish;
import com.a202.fishserver.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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

    public Collection(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Collection{" +
                "id=" + id +
                ", length=" + length +
                ", location='" + location + '\'' +
                ", fish=" + fish +
                ", memo='" + memo + '\'' +
                ", bait='" + bait + '\'' +
                ", fishingInfo='" + fishingInfo + '\'' +
                ", regDate=" + regDate +
                ", flag=" + flag +
                ", user=" + user +
                '}';
    }
}
