package com.example.ranking.domain;

import org.hibernate.property.access.spi.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Collection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long fish_id;
    private long length;

    // Getter and Setter
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getFish_id() {
        return fish_id;
    }

    public void setFish_id(long fish_id) {
        this.fish_id = fish_id;
    }

    public long getLength() {
        return length;
    }

    public void setLength(long length) {
        this.length = length;
    }
}
