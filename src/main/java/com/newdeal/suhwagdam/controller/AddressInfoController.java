package com.newdeal.suhwagdam.controller;

import com.newdeal.suhwagdam.dto.AddressInfoDto;
import com.newdeal.suhwagdam.dto.Response;
import com.newdeal.suhwagdam.dto.request.AddressInfoCreateRequest;
import com.newdeal.suhwagdam.dto.response.AddressInfoResponse;
import com.newdeal.suhwagdam.service.AddressInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/address-info")
@RequiredArgsConstructor
public class AddressInfoController {
    private final AddressInfoService addressInfoService;

    @PostMapping
    public Response<Void> createAddressInfo(@Valid @RequestBody AddressInfoCreateRequest request) {
        addressInfoService.create(request);
        return Response.success();
    }

    @GetMapping
    public Response<AddressInfoResponse> getAddressInfo() {
        return Response.success(AddressInfoResponse.fromDto(addressInfoService.getAddressInfo()));
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AddressInfoDto> getBuyerAddress(@PathVariable String accountId) {
        AddressInfoDto buyerAddress = addressInfoService.getBidderAddress(accountId);
        return ResponseEntity.ok(buyerAddress);
    }
}
