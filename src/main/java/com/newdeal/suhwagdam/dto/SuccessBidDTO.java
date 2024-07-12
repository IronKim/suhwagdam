package com.newdeal.suhwagdam.dto;

import com.newdeal.suhwagdam.domain.Bid;
import com.newdeal.suhwagdam.domain.SuccessBid;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class SuccessBidDTO {
    private Long seq;
    private GoodsDto goodsDto;
    private UserAccountDto userAccountDto;
    private int bidAmount;
    private LocalDateTime bidTime;

    public static SuccessBidDTO fromEntity(SuccessBid successBid) {
    	return new SuccessBidDTO(
    			successBid.getSeq(),
                GoodsDto.fromEntity(successBid.getGoods()),
                UserAccountDto.fromEntity(successBid.getParticipant()),
                successBid.getBidAmount(),
                successBid.getBidTime()
        );
    }
}
