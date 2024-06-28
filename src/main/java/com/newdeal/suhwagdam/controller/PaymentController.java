package com.newdeal.suhwagdam.controller;

import com.newdeal.suhwagdam.dto.PaymentDto;
import com.newdeal.suhwagdam.dto.Response;
import com.newdeal.suhwagdam.dto.request.PaymentCreateRequest;
import com.newdeal.suhwagdam.dto.response.PaymentResponse;
import com.newdeal.suhwagdam.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping
    public Response<Void> createPayment(@RequestBody PaymentCreateRequest request) {
        paymentService.create(request.getAmount());
        return Response.success();
    }

    @GetMapping
    public Response<List<PaymentResponse>> getPayments() {
        return Response.success(paymentService.getPayments().stream()
                .map(PaymentDto::fromEntity)
                .map(PaymentResponse::fromDto)
                .collect(Collectors.toList())
        );
    }
}
