// package com.flipkart.clonebackend.controller;

// public class CategoryController {
    
// }
package com.flipkart.clonebackend.controller;

import com.flipkart.clonebackend.model.Category;
import com.flipkart.clonebackend.model.Product;
import com.flipkart.clonebackend.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    // Constructor Injection (Best Practice ✅)
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // GET: Fetch all categories
    @GetMapping
    public List<Product> getAllCategories() {
        return categoryRepository.findAll();
    }
}