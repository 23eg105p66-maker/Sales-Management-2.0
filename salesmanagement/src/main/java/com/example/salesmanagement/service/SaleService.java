package com.example.salesmanagement.service;

import com.example.salesmanagement.dto.SaleRequest;
import com.example.salesmanagement.entity.Customer;
import com.example.salesmanagement.entity.Product;
import com.example.salesmanagement.entity.Sale;
import com.example.salesmanagement.exception.ResourceNotFoundException;
import com.example.salesmanagement.repository.CustomerRepository;
import com.example.salesmanagement.repository.ProductRepository;
import com.example.salesmanagement.repository.SaleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;

    public SaleService(SaleRepository saleRepository,
                       ProductRepository productRepository,
                       CustomerRepository customerRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Sale getSaleById(Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found with ID: " + id));
    }

    public Sale createSale(SaleRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new RuntimeException("Sale quantity must be greater than 0");
        }

        if (product.getQuantity() == null || product.getQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock available");
        }

        double totalPrice = (product.getPrice() == null ? 0.0 : product.getPrice()) * request.getQuantity();

        product.setQuantity(product.getQuantity() - request.getQuantity());
        productRepository.save(product);

        Sale sale = Sale.builder()
                .product(product)
                .customer(customer)
                .quantity(request.getQuantity())
                .totalPrice(totalPrice)
                .date(request.getDate())
                .build();

        return saleRepository.save(sale);
    }

    public void deleteSale(Long id) {
        Sale sale = getSaleById(id);
        saleRepository.delete(sale);
    }
}
