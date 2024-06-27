package com.newdeal.suhwagdam.dto.response;

import com.newdeal.suhwagdam.dto.BidDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class BidResponse {
    private Long seq;
    private GoodsResponse goodsResponse;
    private UserAccountResponse userAccountResponse;
    private int bidAmount;
    private LocalDateTime bidTime;

    public static BidResponse fromBidDto(BidDto bidDto) {
        return new BidResponse(
                bidDto.getSeq(),
                GoodsResponse.fromGoodsDto(bidDto.getGoodsDto()),
                UserAccountResponse.fromUserAccountDto(bidDto.getUserAccountDto()),
                bidDto.getBidAmount(),
                bidDto.getBidTime()
        );
    }
}
