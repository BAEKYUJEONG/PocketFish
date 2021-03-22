package com.example.ranking.config;

import com.example.ranking.repository.CollectionRepository;
import com.example.ranking.repository.JpaCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Configuration
public class JpaConfig {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public JpaConfig(EntityManager em) {
        this.em = em;
    }

    @Bean
    public CollectionRepository collectionRepository() {
        return new JpaCollectionRepository(em);
    }

}
