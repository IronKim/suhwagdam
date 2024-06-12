package com.newdeal.suhwagdam.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    DUPLICATED_ACCOUNT_ID(HttpStatus.CONFLICT, "AccountId is duplicated"),
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "Account not founded"),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "Password is invalid"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Token is invalid"),
    POST_NOT_FOUND(HttpStatus.NOT_FOUND, "Post not founded"),
    INVALID_PERMISSION(HttpStatus.UNAUTHORIZED, "Permission is invalid"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "Request is invalid"),
    MAX_UPLOAD_SIZE_EXCEEDED(HttpStatus.BAD_REQUEST, "Max upload size exceeded"),
    NOT_IMAGE_EXTENSION(HttpStatus.BAD_REQUEST, "Not image extension"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),
    ;

    private final HttpStatus status;
    private final String message;
}
