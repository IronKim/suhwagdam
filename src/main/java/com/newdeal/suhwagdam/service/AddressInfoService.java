package com.newdeal.suhwagdam.service;

import com.newdeal.suhwagdam.domain.AddressInfo;
import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.dto.AddressInfoDto;
import com.newdeal.suhwagdam.dto.request.AddressInfoCreateRequest;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;
import com.newdeal.suhwagdam.repository.AddressInfoRepository;
import com.newdeal.suhwagdam.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressInfoService {
    private final AddressInfoRepository addressInfoRepository;
    private final UserAccountRepository userAccountRepository;

    public void create(AddressInfoCreateRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserAccount userAccount = getUserEntityException(authentication.getName());

        addressInfoRepository.save(AddressInfo.builder()
                .user(userAccount)
                .name(request.getName())
                .number(request.getNumber())
                .address(request.getAddress())
                .detailedAddress(request.getDetailedAddress())
                .build()
        );
    }

    public AddressInfoDto getAddressInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserAccount userAccount = getUserEntityException(authentication.getName());
        return AddressInfoDto.fromEntity(addressInfoRepository.findByUser(userAccount).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.ADDRESS_INFO_NOT_FOUND, "Address info not found")));
    }

    private UserAccount getUserEntityException(String accountId) {
        return userAccountRepository.findByAccountId(accountId).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s not founded", accountId)));
    }
}
