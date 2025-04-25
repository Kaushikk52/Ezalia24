package com.ezalia.demo.controllers;

import com.ezalia.demo.models.Product;
import com.ezalia.demo.models.Rating;
import com.ezalia.demo.models.Review;
import com.ezalia.demo.services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/api/product")
public class ProductController {
    private final ProductService productServ;

    @PostMapping(value = "/add")
    public ResponseEntity<Map<String,Object>> addProduct(@RequestBody Product product){
        Map<String,Object> response = new HashMap();
        try{
            Product savedProduct = productServ.addProduct(product);
            log.info("✔ Product saved {}",savedProduct.getId());
            response.put("message","Product saved by ID : "+savedProduct.getId());
            response.put("product",savedProduct);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("❗❗ An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/filter")
    public ResponseEntity<Map<String,Object>> getFilteredProducts(@RequestParam(required = false) String search){
        Map<String,Object> response = new HashMap();
        try{
            Map<String,Object> filters = new HashMap<>();
            if(search != null) filters.put("search",search);
            List<Product> filteredProducts = productServ.filteredProducts(filters);
            if(filteredProducts.isEmpty()){
                log.warn("⚠ No Products found");
                response.put("message", "No Products found");
            }else {
                log.info("✔ Retrieved filtered Products");
                response.put("message", "Retrieved filtered Products : "+filteredProducts.size());
            }
            response.put("products",filteredProducts);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("❗❗ An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Map<String,Object>> getProductById(@PathVariable String id){
        Map<String,Object> response = new HashMap();
        try{
            Product product = productServ.getProductById(id);
            log.info("✔ Retrieved Product with ID : {}", id);
            response.put("message","Retrieved Product by ID : "+id);
            response.put("product",product);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (RuntimeException e) {
            log.warn("❗❗ A RuntimeException occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

        } catch (Exception e) {
            log.warn("❗❗ An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //TODO : Edit Product endpoints


    @PostMapping(value = "/{id}/rating")
    public ResponseEntity<Map<String, Object>> addRating(@PathVariable String id, @RequestBody Rating rating, Principal principal){
        Map<String, Object> response = new HashMap<>();
        try{
            productServ.addRating(id,rating,principal);
            Product product = productServ.updateAverageRating(id);
            log.info("✔ Rating {} added successfully : {}", rating,id);
            response.put("message","Rating added successfully");
            response.put("avgRating",product.getAvgRating());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("❗❗ An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping(value = "/{id}/review")
    public ResponseEntity<Map<String, Object>> addReview(@PathVariable String id, @RequestBody Review review, Principal principal){
        Map<String,Object> response = new HashMap<>();
        try {
            productServ.addReview(id,review,principal);
            log.info("✔ Review added successfully : {}",id);
            response.put("message","Review added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            log.warn("❗❗ An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String,Object>> removeFacility(@PathVariable String id){
        Map<String,Object> response = new HashMap<>();
        try{
            productServ.deleteProduct(id);
            log.info("✔ Product with ID : {} Deleted successfully",id);
            response.put("message","Product deleted successfully");
            return  ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("❗❗ An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
