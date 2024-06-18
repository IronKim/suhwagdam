package com.newdeal.suhwagdam.dto;

import com.newdeal.suhwagdam.domain.Category;
import com.newdeal.suhwagdam.domain.Goods;
import com.newdeal.suhwagdam.domain.constant.GoodsStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GoodsDto {
    private Long seq;
    private UserAccountDto userAccountDto;
    private Category category;
    private String title;
    private String description;
    private int startingPrice;
    private int currentBidPrice;
    private LocalDateTime deadline;
    private GoodsStatus status;
    private List<GoodsImageDto> images;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    public static GoodsDto fromEntity(Goods goods) {
        return new GoodsDto(
                goods.getSeq(),
                UserAccountDto.fromEntity(goods.getUserAccount()),
                goods.getCategory(),
                goods.getTitle(),
                goods.getDescription(),
                goods.getStartingPrice(),
                goods.getCurrentBidPrice(),
                goods.getDeadline(),
                goods.getStatus(),
                goods.getImages().stream().map(GoodsImageDto::fromEntity).toList(),
                goods.getCreatedAt(),
                goods.getModifiedAt()
        );
    }
}
