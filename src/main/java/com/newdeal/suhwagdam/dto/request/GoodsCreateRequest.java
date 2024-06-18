package com.newdeal.suhwagdam.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class GoodsCreateRequest {
    private String title;
    private String description;
    private long categoryId;
    private int startingPrice;
    private LocalDateTime deadline;
    private List<String> images;
}
