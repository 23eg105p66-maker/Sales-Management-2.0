package com.example.salesmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleRequest {

    private Long productId;
    private Long customerId;
    private Integer quantity;
    private LocalDate date;
}
