package com.a202.fishserver;

import com.a202.fishserver.service.ranking.RankingService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ReEnrollRanksAtStartup implements CommandLineRunner {

    private final RankingService rankingService;

    @Override
    public void run(String... args) throws Exception {
        rankingService.reEnrollRanks();
    }
}
