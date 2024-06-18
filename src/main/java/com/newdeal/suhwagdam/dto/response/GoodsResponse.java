package com.newdeal.suhwagdam.dto.response;

import com.newdeal.suhwagdam.domain.Category;
import com.newdeal.suhwagdam.domain.constant.GoodsStatus;
import com.newdeal.suhwagdam.dto.GoodsDto;
import com.newdeal.suhwagdam.dto.GoodsImageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class GoodsResponse {
    private Long seq;
    private UserAccountResponse userAccountResponse;
    private Category category;
    private String title;
    private String description;
    private int startingPrice;
    private int currentBidPrice;
    private LocalDateTime deadline;
    private GoodsStatus status;
    private List<String> images;
    private LocalDateTime createdAt;

    public static GoodsResponse fromGoodsDto(GoodsDto goodsDto) {
        return new GoodsResponse(
                goodsDto.getSeq(),
                UserAccountResponse.fromUserAccountDto(goodsDto.getUserAccountDto()),
                goodsDto.getCategory(),
                goodsDto.getTitle(),
                goodsDto.getDescription(),
                goodsDto.getStartingPrice(),
                goodsDto.getCurrentBidPrice(),
                goodsDto.getDeadline(),
                goodsDto.getStatus(),
                goodsDto.getImages().stream().map(GoodsImageDto::getPicture).toList(),
                goodsDto.getCreatedAt()
        );
    }
}
