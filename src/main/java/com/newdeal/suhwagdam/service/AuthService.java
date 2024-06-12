package com.newdeal.suhwagdam.service;

import com.newdeal.suhwagdam.dto.UserAccountDto;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;
import com.newdeal.suhwagdam.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UserAccountRepository userAccountRepository;

    public UserAccountDto loadAccountByAccountId(String accountId) {
        return userAccountRepository.findByAccountId(accountId).map(UserAccountDto::fromEntity)
                    .orElseThrow(() -> new SuhwagdamApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s is not founded", accountId)));
    }
}
