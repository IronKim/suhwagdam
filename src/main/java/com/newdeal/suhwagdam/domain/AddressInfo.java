package com.newdeal.suhwagdam.domain;

import com.newdeal.suhwagdam.dto.AddressInfoDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@ToString
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AddressInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @OneToOne
    @JoinColumn(name = "user_seq", nullable = false)
    private UserAccount user;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 20)
    private String number;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String detailedAddress;

    public static AddressInfo fromDto(AddressInfoDto addressInfoDto) {
        return AddressInfo.builder()
                .seq(addressInfoDto.getSeq())
                .user(UserAccount.fromDto(addressInfoDto.getUserAccountDto()))
                .name(addressInfoDto.getName())
                .number(addressInfoDto.getNumber())
                .address(addressInfoDto.getAddress())
                .detailedAddress(addressInfoDto.getDetailedAddress())
                .build();
    }
    public void setName(String name) {
        this.name = name;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDetailedAddress(String detailedAddress) {
        this.detailedAddress = detailedAddress;
    }


}
