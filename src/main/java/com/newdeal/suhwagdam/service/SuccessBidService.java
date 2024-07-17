package com.newdeal.suhwagdam.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newdeal.suhwagdam.controller.SuccessBidController;
import com.newdeal.suhwagdam.domain.AddressInfo;
import com.newdeal.suhwagdam.domain.Bid;
import com.newdeal.suhwagdam.domain.Goods;
import com.newdeal.suhwagdam.domain.SuccessBid;
import com.newdeal.suhwagdam.repository.AddressInfoRepository;
import com.newdeal.suhwagdam.repository.BidRepository;
import com.newdeal.suhwagdam.repository.GoodsRepository;
import com.newdeal.suhwagdam.repository.SuccessBidRepository;
import com.newdeal.suhwagdam.repository.UserAccountRepository;
import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.domain.constant.GoodsStatus;
import com.newdeal.suhwagdam.dto.SuccessBidDTO;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;

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
    private final SuccessBidController successBidController;
    private final AddressInfoRepository addressInfoRepository;
    
 	@Scheduled(fixedRate = 60000)
 	public void saveSuccessBid() {
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
 	            
 	           returnPoint(goods, lastBid.getParticipant());
 	           
 	           goods.setStatus(GoodsStatus.COMPLETE);
 	          
 	           goodsRepository.save(goods);
 	        }
 	    }
 	}

    private void returnPoint(Goods goods, UserAccount lastBid) {
        List<Bid> allBids = bidRepository.findAllByGoods(goods);

        for (Bid bid : allBids) {
            if (!bid.getParticipant().equals(lastBid)) {
                UserAccount nonWinner = bid.getParticipant();
                int originalPoints = nonWinner.getPoint();
                int bidAmount = bid.getBidAmount();
                nonWinner.setPoint(originalPoints + bidAmount);
                userAccountRepository.save(nonWinner);
            }
        }
	}
    public List<SuccessBidDTO> getBidderByGoodsSeq(Long seq) {
    	 List<SuccessBid> successBids = successBidRepository.findByGoodsSeq(seq)
                 .orElseThrow(() -> new SuhwagdamApplicationException(ErrorCode.ACCOUNT_NOT_FOUND));

         return successBids.stream()
                 .map(SuccessBidDTO::fromEntity)
                 .collect(Collectors.toList());
    }
    
}
