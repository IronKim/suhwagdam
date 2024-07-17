package com.newdeal.suhwagdam.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newdeal.suhwagdam.domain.AddressInfo;
import com.newdeal.suhwagdam.domain.Bid;
import com.newdeal.suhwagdam.domain.SuccessBid;
import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.dto.GoodsDto;

public interface SuccessBidRepository extends JpaRepository<SuccessBid, Long> {

	List<SuccessBid> findAllByGoodsSeqOrderByBidAmountDesc(long goodsSeq);

	List<SuccessBid> findByParticipant(UserAccount participant);

	 Optional<List<SuccessBid>> findByGoodsSeq(Long seq);

	
}
