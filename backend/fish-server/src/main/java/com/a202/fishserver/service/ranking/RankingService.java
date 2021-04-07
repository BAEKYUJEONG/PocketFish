package com.a202.fishserver.service.ranking;

import java.util.HashMap;
import java.util.List;

public interface RankingService {
    List<HashMap<String, Object>> getRankbyFishId(long fish_id);
    void reEnrollRanks();
}
