package com.newdeal.suhwagdam.domain;

import com.newdeal.suhwagdam.domain.constant.RoleType;
import com.newdeal.suhwagdam.dto.UserAccountDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@ToString
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @Column(nullable = false, length = 100, unique = true)
    private String accountId;

    @Column(nullable = false, length = 200)
    private String password;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(nullable = false, length = 50)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleType roleType;

    public static UserAccount fromDto(UserAccountDto userAccountDto) {
        return UserAccount.builder()
                .seq(userAccountDto.getSeq())
                .accountId(userAccountDto.getAccountId())
                .password(userAccountDto.getPassword())
                .email(userAccountDto.getEmail())
                .nickname(userAccountDto.getNickname())
                .roleType(userAccountDto.getRoleType())
                .build();
    }
}
