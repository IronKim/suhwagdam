package com.newdeal.suhwagdam.dto;

import com.newdeal.suhwagdam.domain.AddressInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddressInfoDto {
    private Long seq;
    private UserAccountDto userAccountDto;
    private String name;
    private String number;
    private String address;
    private String detailedAddress;

    public static AddressInfoDto fromEntity(AddressInfo addressInfo) {
        return new AddressInfoDto(
                addressInfo.getSeq(),
                UserAccountDto.fromEntity(addressInfo.getUser()),
                addressInfo.getName(),
                addressInfo.getNumber(),
                addressInfo.getAddress(),
                addressInfo.getDetailedAddress()
        );
    }
}
