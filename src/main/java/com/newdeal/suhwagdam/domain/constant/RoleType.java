package com.newdeal.suhwagdam.domain.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RoleType {
    ADMIN("ROLE_ADMIN", "관리자"),
    USER("ROLE_USER", "사용자")
    ;

    private final String name;
    private final String description;
}
