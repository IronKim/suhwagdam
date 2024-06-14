package com.newdeal.suhwagdam.service;

import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.domain.constant.RoleType;
import com.newdeal.suhwagdam.dto.TempUserDto;
import com.newdeal.suhwagdam.dto.UserAccountDto;
import com.newdeal.suhwagdam.dto.request.UserJoinRequest;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;
import com.newdeal.suhwagdam.repository.TempUserAccountCacheRepository;
import com.newdeal.suhwagdam.repository.UserAccountRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final MailSendService mailSendService;
    private final TempUserAccountCacheRepository tempUserAccountCacheRepository;

    private final BCryptPasswordEncoder encoder;

    public final static int TEMP_USER_TTL_IN_MINUTES = 5;

    public UserAccountDto loadAccountByAccountId(String accountId) {
        return userAccountRepository.findByAccountId(accountId).map(UserAccountDto::fromEntity)
                    .orElseThrow(() -> new SuhwagdamApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s is not founded", accountId)));
    }

    public boolean accountIdCheck(String accountId) {
        return userAccountRepository.findByAccountId(accountId).isPresent() || tempUserAccountCacheRepository.hasKeyByAccount(accountId);
    }

    public boolean emailCheck(String email) {
        return userAccountRepository.findByEmail(email).isPresent() || tempUserAccountCacheRepository.hasKeyByEmail(email);
    }

    public void join(UserJoinRequest userJoinRequest) throws MessagingException {
        if(accountIdCheck(userJoinRequest.getAccountId())) {
            throw new SuhwagdamApplicationException(ErrorCode.DUPLICATED_ACCOUNT_ID, String.format("%s is duplicated", userJoinRequest.getAccountId()));
        }

        if(emailCheck(userJoinRequest.getEmail())) {
            throw new SuhwagdamApplicationException(ErrorCode.DUPLICATED_EMAIL, String.format("%s is duplicated", userJoinRequest.getEmail()));
        }

        String certificationToken = UUID.randomUUID().toString();
        mailSendService.sendEmailForCertification(userJoinRequest.getEmail(), certificationToken);

        TempUserDto tempUserDto = TempUserDto.builder()
                .accountId(userJoinRequest.getAccountId())
                .password(encoder.encode(userJoinRequest.getPassword()))
                .email(userJoinRequest.getEmail())
                .nickname(userJoinRequest.getNickname())
                .certificationToken(certificationToken)
                .build();

        tempUserAccountCacheRepository.setJoinUserCache(tempUserDto);
    }

    public void verify(String email, String certificationToken) {

        TempUserDto tempUserDto = tempUserAccountCacheRepository.getJoinUserCacheByEmail(email).orElseThrow(() -> new SuhwagdamApplicationException(ErrorCode.INVALID_CERTIFICATION, String.format("%s is not founded", email)));

        if(!tempUserDto.getCertificationToken().equals(certificationToken)) {
            throw new SuhwagdamApplicationException(ErrorCode.INVALID_CERTIFICATION, "Certification token is invalid");
        }

        userAccountRepository.save(UserAccount.builder()
                .accountId(tempUserDto.getAccountId())
                .password(tempUserDto.getPassword())
                .email(tempUserDto.getEmail())
                .nickname(tempUserDto.getNickname())
                .roleType(RoleType.USER)
                .build());

        tempUserAccountCacheRepository.deleteJoinUserCache(tempUserDto);
    }
}
