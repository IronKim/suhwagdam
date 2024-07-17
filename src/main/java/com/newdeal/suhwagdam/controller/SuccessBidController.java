package com.newdeal.suhwagdam.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.newdeal.suhwagdam.service.WebSocketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/successBid")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SuccessBidController {
    private final WebSocketService webSocketService;
    
}
