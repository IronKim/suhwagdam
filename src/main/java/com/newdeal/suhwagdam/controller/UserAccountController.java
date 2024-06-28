package com.newdeal.suhwagdam.controller;

import com.newdeal.suhwagdam.dto.Response;
import com.newdeal.suhwagdam.dto.request.UserAccountUpdateRequest;
import com.newdeal.suhwagdam.dto.response.BidResponse;
import com.newdeal.suhwagdam.dto.response.GoodsResponse;
import com.newdeal.suhwagdam.dto.response.UserAccountResponse;
import com.newdeal.suhwagdam.dto.response.UserAccountUpdateResponse;
import com.newdeal.suhwagdam.service.UserAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-account")
@RequiredArgsConstructor
public class UserAccountController {
    private final UserAccountService userAccountService;

    @PutMapping("/{userAccountId}")
    public Response<UserAccountUpdateResponse> update(@PathVariable String userAccountId, @RequestBody UserAccountUpdateRequest request) {
        return Response.success(new UserAccountUpdateResponse(userAccountService.update(userAccountId, request)));
    }

    @GetMapping("/{userAccountId}")
    public Response<UserAccountResponse> getUserAccount(@PathVariable String userAccountId) {
        return Response.success(UserAccountResponse.fromUserAccountDto(userAccountService.getUserAccount(userAccountId)));
    }

    @GetMapping("/{userAccountId}/goods")
    public Response<List<GoodsResponse>> getGoodsByUserAccountId(@PathVariable String userAccountId) {
        return Response.success(userAccountService.getGoodsByUserAccountId(userAccountId).stream().map(GoodsResponse::fromGoodsDto).toList());
    }

    @GetMapping("/{userAccountId}/bids")
    public Response<List<BidResponse>> getBidsByUserAccountId(@PathVariable String userAccountId) {
        return Response.success(userAccountService.getBidsByUserAccountId(userAccountId).stream().map(BidResponse::fromBidDto).toList());
    }
}
