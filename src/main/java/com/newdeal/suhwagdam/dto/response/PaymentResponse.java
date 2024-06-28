package com.newdeal.suhwagdam.dto.response;

import com.newdeal.suhwagdam.dto.PaymentDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PaymentResponse {
    private int amount;
    private LocalDateTime createdAt;

    public static PaymentResponse fromDto(PaymentDto paymentDto) {
        return new PaymentResponse(
                paymentDto.getAmount(),
                paymentDto.getCreatedAt()
        );
    }
}
