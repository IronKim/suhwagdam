package com.newdeal.suhwagdam.repository;

import com.newdeal.suhwagdam.domain.Payment;
import com.newdeal.suhwagdam.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUser(UserAccount user);
}
