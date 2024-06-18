package com.newdeal.suhwagdam.dto;

import com.newdeal.suhwagdam.domain.GoodsImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GoodsImageDto {
    private Long seq;
    private String picture;

    public static GoodsImageDto fromEntity(GoodsImage goodsImage) {
        return new GoodsImageDto(
                goodsImage.getSeq(),
                goodsImage.getPicture()
        );
    }
}
