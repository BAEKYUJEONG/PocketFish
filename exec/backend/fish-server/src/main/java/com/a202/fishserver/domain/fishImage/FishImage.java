package com.a202.fishserver.domain.fishImage;

import com.a202.fishserver.domain.collection.Collection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FishImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    private Collection collection;

    private String imagePath;

    @Builder
    public FishImage(Collection collection, String imagePath) {
        this.collection = collection;
        this.imagePath = imagePath;
    }
}
