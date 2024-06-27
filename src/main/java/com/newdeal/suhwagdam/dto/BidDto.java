package com.newdeal.suhwagdam.dto;

import com.newdeal.suhwagdam.domain.Bid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class BidDto {
    private Long seq;
    private GoodsDto goodsDto;
    private UserAccountDto userAccountDto;
    private int bidAmount;
    private LocalDateTime bidTime;

    public static BidDto fromEntity(Bid bid) {
        return new BidDto(
                bid.getSeq(),
                GoodsDto.fromEntity(bid.getGoods()),
                UserAccountDto.fromEntity(bid.getParticipant()),
                bid.getBidAmount(),
                bid.getBidTime()
        );
    }
}
