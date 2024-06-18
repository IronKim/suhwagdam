package com.newdeal.suhwagdam.repository;

import com.newdeal.suhwagdam.domain.Goods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsRepository extends JpaRepository<Goods, Long> {
}
