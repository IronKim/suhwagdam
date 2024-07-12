package com.newdeal.suhwagdam.service;

import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.domain.constant.RoleType;
import com.newdeal.suhwagdam.dto.BidDto;
import com.newdeal.suhwagdam.dto.GoodsDto;
import com.newdeal.suhwagdam.dto.SuccessBidDTO;
import com.newdeal.suhwagdam.dto.UserAccountDto;
import com.newdeal.suhwagdam.dto.request.UserAccountUpdateRequest;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;
import com.newdeal.suhwagdam.repository.BidRepository;
import com.newdeal.suhwagdam.repository.GoodsRepository;
import com.newdeal.suhwagdam.repository.SuccessBidRepository;
import com.newdeal.suhwagdam.repository.UserAccountRepository;
import com.newdeal.suhwagdam.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserAccountService {
    private final UserAccountRepository userAccountRepository;
    private final GoodsRepository goodsRepository;
    private final BidRepository bidRepository;
    private final SuccessBidRepository successBidRepository;

    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.secret-key}")
    private String secretKey;
    @Value("${jwt.expired-time-ms}")
    private long expiredTimeMs;

    public String update(String userAccountId, UserAccountUpdateRequest request) {
        UserAccount userAccount = getUserEntityException(userAccountId);
        userAccount.update(encoder.encode(request.getPassword()), request.getEmail(), request.getNickname());

        return JwtTokenUtils.generateToken(userAccount.getAccountId(), userAccount.getNickname(), RoleType.USER, secretKey, expiredTimeMs);
    }

    public UserAccountDto getUserAccount(String userAccountId) {
        return UserAccountDto.fromEntity(getUserEntityException(userAccountId));
    }

    public List<GoodsDto> getGoodsByUserAccountId(String userAccountId) {
        UserAccount seller = getUserEntityException(userAccountId);
        return goodsRepository.findBySeller(seller).stream()
                .map(GoodsDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<BidDto> getBidsByUserAccountId(String userAccountId) {
        UserAccount participant = getUserEntityException(userAccountId);
        return bidRepository.findByParticipant(participant).stream()
                .map(BidDto::fromEntity)
                .collect(Collectors.toList());
    }
    public List<SuccessBidDTO> getSuccessBidsByUserAccountId(String userAccountId) {
        UserAccount participant = getUserEntityException(userAccountId);
        return successBidRepository.findByParticipant(participant).stream()
        		.map(SuccessBidDTO::fromEntity)
                .collect(Collectors.toList());
    }

    private UserAccount getUserEntityException(String accountId) {
        UserAccount userAccount = userAccountRepository.findByAccountId(accountId).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s not founded", accountId)));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.getName().equals(accountId)) {
            throw new SuhwagdamApplicationException(ErrorCode.INVALID_PERMISSION, "Invalid permission");
        }

        return userAccount;
    }
}
