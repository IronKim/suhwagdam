package com.newdeal.suhwagdam.domain;

import com.newdeal.suhwagdam.dto.PaymentDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@ToString
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false)
    private UserAccount user;

    @Column(nullable = false)
    private int amount;

    @CreatedDate
    private LocalDateTime createdAt;

    public static Payment fromDto(PaymentDto paymentDto) {
        return Payment.builder()
                .seq(paymentDto.getSeq())
                .user(UserAccount.fromDto(paymentDto.getUserAccountDto()))
                .amount(paymentDto.getAmount())
                .createdAt(paymentDto.getCreatedAt())
                .build();
    }
}
