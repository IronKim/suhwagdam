package com.newdeal.suhwagdam.dto.response;

import com.newdeal.suhwagdam.dto.AddressInfoDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AddressInfoResponse {
    private String name;
    private String number;
    private String address;
    private String detailedAddress;

    public static AddressInfoResponse fromDto(AddressInfoDto addressInfoDto) {
        return new AddressInfoResponse(
                addressInfoDto.getName(),
                addressInfoDto.getNumber(),
                addressInfoDto.getAddress(),
                addressInfoDto.getDetailedAddress()
        );
    }
}
