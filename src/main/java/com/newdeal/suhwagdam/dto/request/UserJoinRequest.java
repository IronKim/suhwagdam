package com.newdeal.suhwagdam.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserJoinRequest {
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9]){6,20}$") // 영문, 숫자만 6~20자 조합
    private String accountId;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$") // 영문, 숫자 조합 8~20자
    private String password;

    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = "^.{2,8}$") // 2~8자
    private String nickname;
}
