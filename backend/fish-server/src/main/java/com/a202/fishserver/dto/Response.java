package com.a202.fishserver.dto;

import io.swagger.annotations.ApiModelProperty;

public class Response {
    @ApiModelProperty(value = "status", position = 1)
    public boolean status;
    @ApiModelProperty(value = "message", position = 2)
    public String message;
    @ApiModelProperty(value = "data", position = 3)
    public Object data;
}
