package com.newdeal.suhwagdam.dto.response;

import com.newdeal.suhwagdam.dto.SuccessBidDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SuccessBidResponse {
    private Long seq;
    private GoodsResponse goodsResponse;
    private UserAccountResponse userAccountResponse;
    private int bidAmount;
    private LocalDateTime bidTime;

    public static SuccessBidResponse fromSuccessBidDto(SuccessBidDTO successBidDTO) {
        return new SuccessBidResponse(
                successBidDTO.getSeq(),
                GoodsResponse.fromGoodsDto(successBidDTO.getGoodsDto()),
                UserAccountResponse.fromUserAccountDto(successBidDTO.getUserAccountDto()),
                successBidDTO.getBidAmount(),
                successBidDTO.getBidTime()
        );
    }
}
