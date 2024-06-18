package com.newdeal.suhwagdam.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginRequest {
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9]){6,20}$")
    private String accountId;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$")
    private String password;

    private boolean rememberMe;
}
