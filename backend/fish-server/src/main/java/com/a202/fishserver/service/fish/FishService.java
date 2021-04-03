package com.a202.fishserver.service.fish;

import java.util.HashMap;

public interface FishService {
    HashMap<String,Object> getFishInfo(long fishId) throws Exception;
}
