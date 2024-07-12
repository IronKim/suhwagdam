package com.newdeal.suhwagdam.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SuccessBidCreateRequest {
    private long goodsSeq;
    private int bidAmount;
}
