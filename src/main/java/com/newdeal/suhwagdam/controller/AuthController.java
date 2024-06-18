package com.newdeal.suhwagdam.controller;

import com.newdeal.suhwagdam.dto.Response;
import com.newdeal.suhwagdam.dto.request.UserJoinRequest;
import com.newdeal.suhwagdam.dto.request.UserLoginRequest;
import com.newdeal.suhwagdam.dto.response.UserLoginResponse;
import com.newdeal.suhwagdam.service.AuthService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // 현재 가입되어 있거나 이메일 인증 대기중인 계정인지 확인
    @GetMapping("/id-check/{accountId}")
    public Response<Boolean> checkId(@PathVariable String accountId) {
        return Response.success(authService.accountIdCheck(accountId));
    }

    // 현재 가입되어 있거나 이메일 인증 대기중인 이메일인지 확인
    @GetMapping("/email-check/{email}")
    public Response<Boolean> checkEmail(@PathVariable String email) {
        return Response.success(authService.emailCheck(email));
    }

    // 임시 회원가입 요청
    @PostMapping("/join")
    public Response<Void> join(@Valid UserJoinRequest userJoinRequest) throws MessagingException {
        authService.join(userJoinRequest);
        return Response.success();
    }

    // 최종 회원가입
    @GetMapping("/verify")
    public Response<Void> verify(@RequestParam String email, @RequestParam String certificationToken) {
        authService.verify(email, certificationToken);
        return Response.success();
    }

    @PostMapping("/login")
    public Response<UserLoginResponse> login(@Valid UserLoginRequest userLoginRequest) {
        String token = authService.login(userLoginRequest);
        return Response.success(new UserLoginResponse(token));
    }
}
