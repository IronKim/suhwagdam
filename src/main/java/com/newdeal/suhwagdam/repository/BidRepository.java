package com.newdeal.suhwagdam.repository;

import com.newdeal.suhwagdam.domain.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findAllByGoodsSeqOrderByBidAmountDesc(long goodsSeq);
}
