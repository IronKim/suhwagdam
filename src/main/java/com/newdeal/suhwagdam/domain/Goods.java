package com.newdeal.suhwagdam.domain;

import com.newdeal.suhwagdam.domain.constant.GoodsStatus;
import com.newdeal.suhwagdam.dto.GoodsDto;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@ToString
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Goods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @ManyToOne
    @JoinColumn(name = "seller_seq", nullable = false)
    private UserAccount userAccount;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private int startingPrice;

    @Column(nullable = false)
    private int currentBidPrice;

    @Column(nullable = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime deadline;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GoodsStatus status;

    @OneToMany(mappedBy = "goods", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GoodsImage> images;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public void addImages(List<GoodsImage> images) {
        this.images.addAll(images);
    }

    public void addImage(GoodsImage image) {
        this.images.add(image);
    }

    public void clearImages() {
        this.images.clear();
    }

    public static Goods fromDto(GoodsDto goodsDto) {
        return Goods.builder()
                .seq(goodsDto.getSeq())
                .userAccount(UserAccount.fromDto(goodsDto.getUserAccountDto()))
                .title(goodsDto.getTitle())
                .description(goodsDto.getDescription())
                .category(goodsDto.getCategory())
                .startingPrice(goodsDto.getStartingPrice())
                .currentBidPrice(goodsDto.getCurrentBidPrice())
                .deadline(goodsDto.getDeadline())
                .status(goodsDto.getStatus())
                .images(goodsDto.getImages().stream().map(GoodsImage::fromDto).toList())
                .createdAt(goodsDto.getCreatedAt())
                .build();
    }

    public void updateCurrentBidPrice(int newBidPrice) {
        if (this.getCurrentBidPrice() >= newBidPrice) {
            throw new SuhwagdamApplicationException(ErrorCode.INVALID_BID_AMOUNT, "Invalid bid amount");
        }
        this.currentBidPrice = newBidPrice;
    }
}
