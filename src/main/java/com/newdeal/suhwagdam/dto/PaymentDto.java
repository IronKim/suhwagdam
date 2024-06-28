package com.newdeal.suhwagdam.dto;

import com.newdeal.suhwagdam.domain.Payment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class PaymentDto {
    private Long seq;
    private UserAccountDto userAccountDto;
    private int amount;
    private LocalDateTime createdAt;

    public static PaymentDto fromEntity(Payment payment) {
        return new PaymentDto(
                payment.getSeq(),
                UserAccountDto.fromEntity(payment.getUser()),
                payment.getAmount(),
                payment.getCreatedAt()
        );
    }
}
