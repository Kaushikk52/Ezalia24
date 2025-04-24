package com.ezalia.demo.services;

import com.ezalia.demo.models.Product;
import com.ezalia.demo.repositories.ProductRepo;
import com.ezalia.demo.specifications.GenericSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepo productRepo;
    private final ImageService imgServ;

    public Product addProduct(Product product) {
        Product savedProduct = productRepo.save(product);
        return savedProduct;
    }

    public List<Product> filteredProducts(Map<String,Object> filters){
        List<Product> allProducts;
        if(filters.isEmpty()){
            allProducts = productRepo.findAll();
        }else {
            Specification<Product> spec = GenericSpecification.findByCriteria(filters);
            allProducts = productRepo.findAll(spec);
        }
        return allProducts;
    }

    public Product getProductById(String id){
        Product product = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found..."));
        return  product;
    }

    // sku, name, description, images, price
    public void editProductDetails(){

    }

    public void editProductStock(){}

    public void editProductTags(){}

    public void editProductCategory(){}

    public String deleteProduct(String id){
        Product existingProduct = this.getProductById(id);
        List<String> results = imgServ.deleteFiles(existingProduct.getImages(),"Product");
        productRepo.delete(existingProduct);
        return "Delete Product by ID" + id;
    }

}
