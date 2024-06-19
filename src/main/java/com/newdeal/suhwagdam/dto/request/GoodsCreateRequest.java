package com.newdeal.suhwagdam.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class GoodsCreateRequest {

    @NotBlank
    @Size(max = 30)
    private String title;

    @NotBlank
    @Size(max = 100)
    private String description;

    private long categoryId;

    private int startingPrice;

    @Future
    private LocalDateTime deadline;


    private List<String> images;
}
