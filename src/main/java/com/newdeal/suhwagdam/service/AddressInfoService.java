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

import java.util.Optional;

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
        UserAccount userAccount = getUserAccount(authentication.getName());

        Optional<AddressInfo> existingAddressInfoOptional = addressInfoRepository.findByUser(userAccount);
        
        if (existingAddressInfoOptional.isPresent()) {
            AddressInfo existingAddressInfo = existingAddressInfoOptional.get();
            existingAddressInfo.setName(request.getName());
            existingAddressInfo.setNumber(request.getNumber());
            existingAddressInfo.setAddress(request.getAddress());
            existingAddressInfo.setDetailedAddress(request.getDetailedAddress());
            addressInfoRepository.save(existingAddressInfo); 
        } else {
            AddressInfo newAddressInfo = AddressInfo.builder()
                    .user(userAccount)
                    .name(request.getName())
                    .number(request.getNumber())
                    .address(request.getAddress())
                    .detailedAddress(request.getDetailedAddress())
                    .build();
            addressInfoRepository.save(newAddressInfo); 
        }
    }

    public AddressInfoDto getAddressInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserAccount userAccount = getUserAccount(authentication.getName());
        return AddressInfoDto.fromEntity(addressInfoRepository.findByUser(userAccount).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.ADDRESS_INFO_NOT_FOUND, "Address info not found")));
    }

    private UserAccount getUserAccount(String accountId) {
        return userAccountRepository.findByAccountId(accountId).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s not founded", accountId)));
    }
    public AddressInfoDto getBidderAddress(String accountId) {
        UserAccount userAccount = getUserAccount(accountId);
        return AddressInfoDto.fromEntity(addressInfoRepository.findByUser(userAccount).orElseThrow(() ->
            new SuhwagdamApplicationException(ErrorCode.ADDRESS_INFO_NOT_FOUND, "Address info not found")));
    }
}
