package com.newdeal.suhwagdam.repository;

import com.newdeal.suhwagdam.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
