package com.newdeal.suhwagdam.domain;

import com.newdeal.suhwagdam.domain.constant.RoleType;
import com.newdeal.suhwagdam.dto.UserAccountDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@ToString(callSuper = true)
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SQLDelete(sql = "UPDATE user_account SET deleted_at = NOW() WHERE seq = ?")
@SQLRestriction("deleted_at IS NULL")
public class UserAccount extends AuditingFields {

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

    private Double creditScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleType roleType;

    public static UserAccount toEntity(UserAccountDto userAccountDto) {
        return UserAccount.builder()
                .seq(userAccountDto.getSeq())
                .accountId(userAccountDto.getAccountId())
                .password(userAccountDto.getPassword())
                .email(userAccountDto.getEmail())
                .nickname(userAccountDto.getNickname())
                .creditScore(userAccountDto.getCreditScore())
                .roleType(userAccountDto.getRoleType())
                .build();
    }
}
