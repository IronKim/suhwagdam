package com.newdeal.suhwagdam.dto.response;

import com.newdeal.suhwagdam.dto.UserAccountDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserAccountResponse {
    private Long seq;
    private String accountId;
    private String email;
    private String nickname;
    private int point;

    public static UserAccountResponse fromUserAccountDto(UserAccountDto userAccountDto) {
        return new UserAccountResponse(
                userAccountDto.getSeq(),
                userAccountDto.getAccountId(),
                userAccountDto.getEmail(),
                userAccountDto.getNickname(),
                userAccountDto.getPoint()
        );
    }
}
