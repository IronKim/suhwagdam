package com.newdeal.suhwagdam.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.newdeal.suhwagdam.dto.GoodsImageDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@ToString
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class GoodsImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_seq", nullable = false)
    private Goods goods;

    @Column(nullable = false)
    private String picture;

    public static GoodsImage fromDto(GoodsImageDto goodsImageDto) {
        return GoodsImage.builder()
                .seq(goodsImageDto.getSeq())
                .picture(goodsImageDto.getPicture())
                .build();
    }
}
