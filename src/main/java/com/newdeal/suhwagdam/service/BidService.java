package com.newdeal.suhwagdam.service;

import com.newdeal.suhwagdam.domain.Bid;
import com.newdeal.suhwagdam.domain.Goods;
import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.dto.BidDto;
import com.newdeal.suhwagdam.dto.request.BidCreateRequest;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;
import com.newdeal.suhwagdam.repository.BidRepository;
import com.newdeal.suhwagdam.repository.GoodsRepository;
import com.newdeal.suhwagdam.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class BidService {
    private final UserAccountRepository userAccountRepository;
    private final GoodsRepository goodsRepository;
    private final BidRepository bidRepository;

    public BidDto create(BidCreateRequest request, String accountId) {
        UserAccount userAccount = getUserEntityException(accountId);
        Goods goods = getGoodsEntityException(request.getGoodsSeq());

        // TODO: 판매자나 마지막 입찰자가 입찰을 할 수 없도록 처리

        goods.updateCurrentBidPrice(request.getBidAmount());

        Goods updatedGoods = goodsRepository.save(goods);

        Bid bid = bidRepository.save(Bid.builder()
                        .userAccount(userAccount)
                        .goods(updatedGoods)
                        .bidAmount(request.getBidAmount())
                        .bidTime(LocalDateTime.now())
                        .build());

        return BidDto.fromEntity(bid);
    }

    private UserAccount getUserEntityException(String accountId) {
        return userAccountRepository.findByAccountId(accountId).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s not founded", accountId)));
    }

    private Goods getGoodsEntityException(long goodsSeq) {
        return goodsRepository.findById(goodsSeq).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.GOODS_NOT_FOUND, String.format("%s not founded", goodsSeq)));
    }
}
