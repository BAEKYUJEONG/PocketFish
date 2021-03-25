package com.a202.fishserver.domain.fish;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Fish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer fishLength;
    private String habitat;
    private String activity;
    private boolean catchOk;
    private Integer sizeOk;
    private boolean poison;
    private String description;

}