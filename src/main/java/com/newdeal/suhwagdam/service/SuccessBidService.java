package com.newdeal.suhwagdam.service;

import java.awt.print.Printable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newdeal.suhwagdam.domain.Bid;
import com.newdeal.suhwagdam.domain.Goods;
import com.newdeal.suhwagdam.domain.SuccessBid;
import com.newdeal.suhwagdam.dto.BidDto;
import com.newdeal.suhwagdam.dto.SuccessBidDTO;
import com.newdeal.suhwagdam.dto.request.BidCreateRequest;
import com.newdeal.suhwagdam.dto.request.SuccessBidCreateRequest;
import com.newdeal.suhwagdam.dto.response.BidResponse;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;
import com.newdeal.suhwagdam.repository.BidRepository;
import com.newdeal.suhwagdam.repository.GoodsRepository;
import com.newdeal.suhwagdam.repository.SuccessBidRepository;
import com.newdeal.suhwagdam.repository.UserAccountRepository;
import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.domain.constant.GoodsStatus;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@Transactional
@RequiredArgsConstructor
public class SuccessBidService {
	 private final UserAccountRepository userAccountRepository;
	 private final GoodsRepository goodsRepository;
	 private final BidRepository bidRepository;
	 private final SuccessBidRepository successBidRepository;
	 private static final Logger log = LoggerFactory.getLogger(SuccessBidService.class);
	 
	 	@Scheduled(fixedRate = 60000)
	 	public void saveSuccessBid() {
//	 	    log.debug("saveSuccessBid 시작");
	 	    LocalDateTime nowTime = LocalDateTime.now();
	 	    List<Goods> endGoods = goodsRepository.findByStatusAndDeadlineBefore(GoodsStatus.PROGRESS,nowTime);
	 	    
	 	    for (Goods goods : endGoods) {
	 	        Bid lastBid = bidRepository.findTopByGoodsOrderByBidTimeDesc(goods);
	 	        
	 	        if (lastBid != null) {
	 	            SuccessBid successBid = successBidRepository.save(SuccessBid.builder()
	 	                    .participant(lastBid.getParticipant())
	 	                    .goods(goods)
	 	                    .bidAmount(lastBid.getBidAmount())
	 	                    .bidTime(goods.getDeadline())
	 	                    .build());
	 	           goods.setStatus(GoodsStatus.COMPLETE);
//	 	            log.debug("저장된 SuccessBid: {}", successBid);
	 	        }
	 	    }
	 	    
//	 	    log.debug("saveSuccessBid 종료");
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
