package com.a202.fishserver.domain.collection;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer length;
    private String location;
    private Long fishId; // class 만들어서 수정해야함
    private String memo;
    private String bait;
    private String fishingInfo;
    private LocalDateTime regDate;
    private Boolean flag;
    private Long userId; // class 만들어서 수정해야함

}
