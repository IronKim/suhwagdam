package com.newdeal.suhwagdam.controller;

import com.newdeal.suhwagdam.domain.SuccessBid;
import com.newdeal.suhwagdam.dto.AddressInfoDto;
import com.newdeal.suhwagdam.dto.Response;
import com.newdeal.suhwagdam.dto.SuccessBidDTO;
import com.newdeal.suhwagdam.dto.request.GoodsCreateRequest;
import com.newdeal.suhwagdam.dto.response.AddressInfoResponse;
import com.newdeal.suhwagdam.dto.response.GoodsResponse;
import com.newdeal.suhwagdam.repository.AddressInfoRepository;
import com.newdeal.suhwagdam.service.AddressInfoService;
import com.newdeal.suhwagdam.service.GoodsService;
import com.newdeal.suhwagdam.service.SuccessBidService;
import com.newdeal.suhwagdam.service.WebSocketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/goods")
@RequiredArgsConstructor
public class GoodsController {
    private final GoodsService goodsService;
    private final WebSocketService webSocketService;
    private final SuccessBidService successBidService;
    private final AddressInfoService addressInfoService;


    @PostMapping
    public Response<Void> createGoods(@Valid @RequestBody GoodsCreateRequest request, Authentication authentication) {
        GoodsResponse goodsResponse = GoodsResponse.fromGoodsDto(goodsService.create(request, authentication.getName()));

        // 상품 등록 시 브로드캐스트
        webSocketService.broadcastGoodsUpdate(goodsResponse);

        return Response.success();
    }

    @GetMapping
    public Response<List<GoodsResponse>> list() {
        return Response.success(goodsService.list().stream().map(GoodsResponse::fromGoodsDto).toList());
    }
    @GetMapping("/{seq}/bidder")
    public Response<List<SuccessBidDTO>> getBidderByGoodsSeq(@PathVariable Long seq) {
        return Response.success(successBidService.getBidderByGoodsSeq(seq));
    }
}
