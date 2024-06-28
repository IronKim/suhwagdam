package com.newdeal.suhwagdam.service;

import com.newdeal.suhwagdam.domain.Payment;
import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;
import com.newdeal.suhwagdam.repository.PaymentRepository;
import com.newdeal.suhwagdam.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final UserAccountRepository userAccountRepository;

    public void create(int amount) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserAccount userAccount = getUserEntityException(authentication.getName());

        paymentRepository.save(Payment.builder()
                .user(userAccount)
                .amount(amount)
                .build()
        );
    }

    public List<Payment> getPayments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserAccount userAccount = getUserEntityException(authentication.getName());
        return paymentRepository.findByUser(userAccount);
    }

    private UserAccount getUserEntityException(String accountId) {
        return userAccountRepository.findByAccountId(accountId).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s not founded", accountId)));
    }

}
