package com.newdeal.suhwagdam.repository;

import com.newdeal.suhwagdam.domain.AddressInfo;
import com.newdeal.suhwagdam.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressInfoRepository extends JpaRepository<AddressInfo, Long> {
    Optional<AddressInfo> findByUser(UserAccount userAccount);
}
