package com.newdeal.suhwagdam.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@ToString
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @JoinColumn(name = "user_seq")
    @ManyToOne(optional = false)
    private UserAccount userAccount;

    @JoinColumn(name = "goods_seq")
    @ManyToOne(optional = false)
    private Goods goods;

    @Column(nullable = false)
    private int bidAmount;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(nullable = false)
    private LocalDateTime bidTime;
}
