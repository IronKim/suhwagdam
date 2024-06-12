package com.newdeal.suhwagdam.domain;

import com.newdeal.suhwagdam.domain.converter.CommaConverter;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@ToString(callSuper = true)
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SQLDelete(sql = "UPDATE goods SET deleted_at = NOW() WHERE seq = ?")
@SQLRestriction("deleted_at IS NULL")
public class Goods extends AuditingFields {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @JoinColumn(name = "user_seq")
    @ManyToOne(optional = false)
    private UserAccount userAccount;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Convert(converter = CommaConverter.class)
    @Column(nullable = false, columnDefinition = "TEXT")
    private List<String> image;

    @Column(nullable = false)
    private int startingPrice;

    @Column(nullable = false)
    private int currentBidPrice;

    @Column(nullable = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime deadline;
}
