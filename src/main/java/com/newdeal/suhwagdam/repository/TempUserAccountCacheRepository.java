package com.newdeal.suhwagdam.repository;

import com.newdeal.suhwagdam.dto.TempUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Optional;

import static com.newdeal.suhwagdam.service.AuthService.TEMP_USER_TTL_IN_MINUTES;

@Slf4j
@Repository
@RequiredArgsConstructor
public class TempUserAccountCacheRepository {

    private final RedisTemplate<String, TempUserDto> tempUserRedisTemplate;

    public void setJoinUserCache(TempUserDto tempUserDto) {
        String accountKey = "USERJOIN:" + tempUserDto.getAccountId();
        String emailKey = "USERJOIN:" + tempUserDto.getEmail();
        tempUserRedisTemplate.opsForValue().set(accountKey, tempUserDto, Duration.ofMinutes(TEMP_USER_TTL_IN_MINUTES));
        tempUserRedisTemplate.opsForValue().set(emailKey, tempUserDto, Duration.ofMinutes(TEMP_USER_TTL_IN_MINUTES));
        log.info("Set UserAccount to Redis {}, {}",accountKey, tempUserDto);
    }

    public Optional<TempUserDto> getJoinUserCacheByEmail(String email) {
        String emailKey = "USERJOIN:" + email;
        TempUserDto userAccountDto = tempUserRedisTemplate.opsForValue().get(emailKey);
        log.info("Get TempUserAccount from Redis {}, {}",emailKey, userAccountDto);
        return Optional.ofNullable(userAccountDto);
    }

    public void deleteJoinUserCache(TempUserDto tempUserDto) {
        String accountKey = "USERJOIN:" + tempUserDto.getAccountId();
        String emailKey = "USERJOIN:" + tempUserDto.getEmail();
        tempUserRedisTemplate.delete(accountKey);
        tempUserRedisTemplate.delete(emailKey);
        log.info("Delete TempUserAccount from Redis {}, {}",accountKey, tempUserDto);
    }

    public boolean hasKeyByAccount(String accountId) {
        String accountKey = "USERJOIN:" + accountId;
        Boolean keyExists = tempUserRedisTemplate.hasKey(accountKey);
        return keyExists != null && keyExists;
    }

    public boolean hasKeyByEmail(String email) {
        String emailKey = "USERJOIN:" + email;
        Boolean keyExists = tempUserRedisTemplate.hasKey(emailKey);
        return keyExists != null && keyExists;
    }
}
