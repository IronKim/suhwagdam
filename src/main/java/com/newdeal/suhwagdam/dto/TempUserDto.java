package com.newdeal.suhwagdam.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TempUserDto {
    private String accountId;
    private String password;
    private String nickname;
    private String email;
    private String certificationToken;
}
