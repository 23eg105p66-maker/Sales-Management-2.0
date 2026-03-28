package com.example.salesmanagement.repository;

import com.example.salesmanagement.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
