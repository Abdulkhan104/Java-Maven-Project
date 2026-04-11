package com.flipkart.clonebackend.controller;

import com.flipkart.clonebackend.model.Category;
import com.flipkart.clonebackend.model.Product;
import com.flipkart.clonebackend.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3001")  // Add this line
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Category> getAllProducts() {
        return productRepository.findAll();
    }
    
    @GetMapping("/category/{categoryId}")
    public Optional<Category> getProductsByCategory(@PathVariable Long categoryId) {
        return productRepository.findById(categoryId);
    }
}