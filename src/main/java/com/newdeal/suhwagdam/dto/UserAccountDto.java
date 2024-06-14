package com.newdeal.suhwagdam.dto;

import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.domain.constant.RoleType;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserAccountDto implements UserDetails {
    private Long seq;
    private String accountId;
    private String password;
    private String email;
    private String nickname;
    private Double creditScore;
    private RoleType roleType;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime modifiedAt;
    private String modifiedBy;
    private LocalDateTime deletedAt;

    public static UserAccountDto fromEntity(UserAccount userAccount) {
        return new UserAccountDto(
                userAccount.getSeq(),
                userAccount.getAccountId(),
                userAccount.getPassword(),
                userAccount.getEmail(),
                userAccount.getNickname(),
                userAccount.getCreditScore(),
                userAccount.getRoleType(),
                userAccount.getCreatedAt(),
                userAccount.getCreatedBy(),
                userAccount.getModifiedAt(),
                userAccount.getModifiedBy(),
                userAccount.getDeletedAt()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.getRoleType().getName()));
    }

    @Override
    public String getUsername() {
        return this.accountId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.deletedAt == null;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.deletedAt == null;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.deletedAt == null;
    }

    @Override
    public boolean isEnabled() {
        return this.deletedAt == null;
    }
}
