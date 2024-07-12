package com.newdeal.suhwagdam.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newdeal.suhwagdam.dto.Response;
import com.newdeal.suhwagdam.dto.SuccessBidDTO;
import com.newdeal.suhwagdam.dto.request.SuccessBidCreateRequest;
import com.newdeal.suhwagdam.dto.response.BidResponse;
import com.newdeal.suhwagdam.dto.response.SuccessBidResponse;
import com.newdeal.suhwagdam.repository.SuccessBidRepository;
import com.newdeal.suhwagdam.service.BidService;
import com.newdeal.suhwagdam.service.SuccessBidService;
import com.newdeal.suhwagdam.service.WebSocketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/successBid")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SuccessBidController {
    private final SuccessBidService successBidService;
    private final WebSocketService webSocketService;
    


}
