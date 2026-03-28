package com.example.salesmanagement.controller;

import com.example.salesmanagement.dto.SaleRequest;
import com.example.salesmanagement.entity.Sale;
import com.example.salesmanagement.service.SaleService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:5173")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public List<Sale> getAllSales() {
        return saleService.getAllSales();
    }

    @GetMapping("/{id}")
    public Sale getSaleById(@PathVariable Long id) {
        return saleService.getSaleById(id);
    }

    @PostMapping
    public Sale createSale(@RequestBody SaleRequest request) {
        return saleService.createSale(request);
    }

    @DeleteMapping("/{id}")
    public String deleteSale(@PathVariable Long id) {
        saleService.deleteSale(id);
        return "Sale deleted successfully";
    }
}
