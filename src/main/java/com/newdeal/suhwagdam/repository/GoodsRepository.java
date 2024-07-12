package com.newdeal.suhwagdam.repository;

import com.newdeal.suhwagdam.domain.Goods;
import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.domain.constant.GoodsStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface GoodsRepository extends JpaRepository<Goods, Long> {
    List<Goods> findBySeller(UserAccount seller);

	List<Goods> findByStatusAndDeadlineBefore(GoodsStatus status,LocalDateTime nowTime);
}
