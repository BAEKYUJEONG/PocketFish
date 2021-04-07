package com.a202.fishserver.controller;

import com.a202.fishserver.dto.Response;
import com.a202.fishserver.service.ranking.RankingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/ranking")
@AllArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/{fish_id}")
    public Object getRankByFishId(@PathVariable("fish_id") long fish_id) {

        List<HashMap<String, Object>> ranks = rankingService.getRankbyFishId(fish_id);

        return Response.builder()
                .status(true)
                .message("낚시 랭킹 불러오기 성공")
                .data(ranks)
                .build();
    }

    @GetMapping()
    public void reEnrollRanks() {
        rankingService.reEnrollRanks();
    }

}
