package com.newdeal.suhwagdam.repository;

import com.newdeal.suhwagdam.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByAccountId(String accountId);
}
