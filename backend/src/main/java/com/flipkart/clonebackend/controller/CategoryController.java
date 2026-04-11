package com.flipkart.clonebackend.controller;

import com.flipkart.clonebackend.model.Category;
import com.flipkart.clonebackend.model.Product;
import com.flipkart.clonebackend.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3001")  // Add this line
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Product> getAllCategories() {
        return categoryRepository.findAll();
    }
}