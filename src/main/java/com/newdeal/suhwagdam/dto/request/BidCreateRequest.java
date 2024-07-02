package com.newdeal.suhwagdam.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class BidCreateRequest {
    private long goodsSeq;
    private int bidAmount;
}
