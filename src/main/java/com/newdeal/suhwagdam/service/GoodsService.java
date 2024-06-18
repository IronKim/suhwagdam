package com.newdeal.suhwagdam.service;

import com.newdeal.suhwagdam.domain.Category;
import com.newdeal.suhwagdam.domain.Goods;
import com.newdeal.suhwagdam.domain.GoodsImage;
import com.newdeal.suhwagdam.domain.UserAccount;
import com.newdeal.suhwagdam.domain.constant.GoodsStatus;
import com.newdeal.suhwagdam.dto.GoodsDto;
import com.newdeal.suhwagdam.dto.request.GoodsCreateRequest;
import com.newdeal.suhwagdam.exception.ErrorCode;
import com.newdeal.suhwagdam.exception.SuhwagdamApplicationException;
import com.newdeal.suhwagdam.repository.CategoryRepository;
import com.newdeal.suhwagdam.repository.GoodsImageRepository;
import com.newdeal.suhwagdam.repository.GoodsRepository;
import com.newdeal.suhwagdam.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class GoodsService {
    private final UserAccountRepository userAccountRepository;
    private final GoodsRepository goodsRepository;
    private final CategoryRepository categoryRepository;

    public GoodsDto create(GoodsCreateRequest request, String accountId) {
        UserAccount userAccount = getUserEntityException(accountId);
        Category category = findCategory(request.getCategoryId());

        Goods goods = goodsRepository.save(Goods.builder()
                .userAccount(userAccount)
                .title(request.getTitle())
                .description(request.getDescription())
                .category(category)
                .startingPrice(request.getStartingPrice())
                .currentBidPrice(request.getStartingPrice())
                .deadline(request.getDeadline())
                .status(GoodsStatus.PROGRESS)
                .images(new ArrayList<>())
                .build());

        List<GoodsImage> goodsImages = saveGoodsImages(request.getImages(), goods);

        goods.addImages(goodsImages);

        Goods savedGoods = goodsRepository.save(goods);

        return GoodsDto.fromEntity(savedGoods);
    }

    public List<GoodsDto> list() {
        return goodsRepository.findAll().stream()
                .map(GoodsDto::fromEntity)
                .collect(Collectors.toList());
    }

    public GoodsDto updateCurrentBidPriceGoods(long goodsId, int currentBidPrice) {
        Goods goods = goodsRepository.findById(goodsId).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.GOODS_NOT_FOUND, String.format("%s not founded", goodsId)));

        return GoodsDto.fromEntity(goods);
    }

    private UserAccount getUserEntityException(String accountId) {
        return userAccountRepository.findByAccountId(accountId).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.ACCOUNT_NOT_FOUND, String.format("%s not founded", accountId)));
    }

    private Category findCategory(long categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() ->
                new SuhwagdamApplicationException(ErrorCode.CATEGORY_NOT_FOUND, String.format("%s not founded", categoryId)));
    }

    private List<GoodsImage> saveGoodsImages(List<String> images, Goods goods) {
        //TODO s3 버킷에 이미지 추가 로직

        return images.stream()
                .map(image -> {
                    return GoodsImage.builder()
                            .picture(image)
                            .goods(goods)
                            .build();
                })
                .collect(Collectors.toList());
    }
}
