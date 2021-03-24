package com.a202.fishserver.domain.fishImage;

import com.a202.fishserver.domain.collection.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FishImageRepository extends JpaRepository<FishImage, Collection> {
    Optional<FishImage> findByCollection(Collection collection);
}
