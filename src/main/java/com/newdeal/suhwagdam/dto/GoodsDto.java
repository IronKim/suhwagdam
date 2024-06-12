package com.newdeal.suhwagdam.dto;

import com.newdeal.suhwagdam.domain.Goods;
import com.newdeal.suhwagdam.domain.UserAccount;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class GoodsDto {
    private Long seq;
    private UserAccount userAccount;
    private String title;
    private String description;
    private List<String> image;
    private int startingPrice;
    private int currentBidPrice;
    private LocalDateTime deadline;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime modifiedAt;
    private String modifiedBy;
    private LocalDateTime deletedAt;

    public static GoodsDto fromEntity(Goods goods) {
        return new GoodsDto(
                goods.getSeq(),
                goods.getUserAccount(),
                goods.getTitle(),
                goods.getDescription(),
                goods.getImage(),
                goods.getStartingPrice(),
                goods.getCurrentBidPrice(),
                goods.getDeadline(),
                goods.getCreatedAt(),
                goods.getCreatedBy(),
                goods.getModifiedAt(),
                goods.getModifiedBy(),
                goods.getDeletedAt()
        );
    }
}
