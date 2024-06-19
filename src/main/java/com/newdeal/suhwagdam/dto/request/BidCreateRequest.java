package com.newdeal.suhwagdam.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BidCreateRequest {
    private long goodsSeq;
    private int bidAmount;
}
