package com.example.ranking.repository;

import com.example.ranking.domain.Collection;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
public class JpaCollectionRepository implements CollectionRepository {
    private final EntityManager em;

    @Autowired
    public JpaCollectionRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Collection save(Collection collection) {
        em.persist(collection);
        return collection;
    }

    @Override
    public Optional<Collection> findById(long id) {
        Collection collection = em.find(Collection.class, id);
        return Optional.ofNullable(collection);
    }

    @Override
    public List<Collection> findAll() {
        return em.createQuery("select c from Collection c", Collection.class)
                .getResultList();
    }
}
