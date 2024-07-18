package com.newdeal.suhwagdam.config;

import com.newdeal.suhwagdam.dto.TempUserDto;
import io.lettuce.core.RedisURI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Slf4j
@Configuration
@EnableRedisRepositories
@RequiredArgsConstructor
public class RedisConfig {

    private final RedisProperties redisProperties;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisURI redisURI = RedisURI.create(redisProperties.getUrl());
        org.springframework.data.redis.connection.RedisConfiguration configuration = LettuceConnectionFactory.createRedisConfiguration(redisURI);
        LettuceConnectionFactory factory = new LettuceConnectionFactory(configuration);
        factory.afterPropertiesSet();

        // 연결 테스트
        try {
        	log.debug("redis property: url {}:{} pw {}", redisURI.getHost(), redisURI.getPort(), redisURI.getPassword());
            factory.getConnection().ping();
        } catch (Exception e) {
            throw new RuntimeException("Redis connection failed");
        }

        return factory;
    }

    @Bean
    public RedisTemplate<String, TempUserDto> tempUserRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, TempUserDto> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<TempUserDto>(TempUserDto.class));

        return redisTemplate;
    }
}
