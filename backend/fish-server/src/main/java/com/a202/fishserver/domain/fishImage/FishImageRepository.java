package com.a202.fishserver.domain.fishImage;

import com.a202.fishserver.domain.collection.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishImageRepository extends JpaRepository<FishImage, Long> {
    List<FishImage> findByCollection(Collection collection);
}
