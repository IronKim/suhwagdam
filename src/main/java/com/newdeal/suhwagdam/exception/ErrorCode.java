package com.newdeal.suhwagdam.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    DUPLICATED_ACCOUNT_ID(HttpStatus.CONFLICT, "AccountId is duplicated"),
    DUPLICATED_EMAIL(HttpStatus.CONFLICT, "Email is duplicated"),
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "Account not founded"),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "Password is invalid"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Token is invalid"),
    GOODS_NOT_FOUND(HttpStatus.NOT_FOUND, "Goods not founded"),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Category not founded"),
    INVALID_BID_AMOUNT(HttpStatus.BAD_REQUEST, "Bid amount is invalid"),
    INVALID_PERMISSION(HttpStatus.UNAUTHORIZED, "Permission is invalid"),
    INVALID_CERTIFICATION(HttpStatus.UNAUTHORIZED, "Certification is invalid"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "Request is invalid"),
    MAX_UPLOAD_SIZE_EXCEEDED(HttpStatus.BAD_REQUEST, "Max upload size exceeded"),
    NOT_IMAGE_EXTENSION(HttpStatus.BAD_REQUEST, "Not image extension"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),
    ;

    private final HttpStatus status;
    private final String message;
}
