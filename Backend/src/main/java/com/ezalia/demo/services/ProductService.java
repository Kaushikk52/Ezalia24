package com.ezalia.demo.services;

import com.ezalia.demo.models.Product;
import com.ezalia.demo.models.Rating;
import com.ezalia.demo.models.Review;
import com.ezalia.demo.models.User;
import com.ezalia.demo.repositories.ProductRepo;
import com.ezalia.demo.repositories.RatingRepo;
import com.ezalia.demo.repositories.ReviewRepo;
import com.ezalia.demo.repositories.UserRepo;
import com.ezalia.demo.specifications.GenericSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepo productRepo;
    private final UserRepo userRepo;
    private  final RatingRepo ratingRepo;
    private final ReviewRepo reviewRepo;
    private final ImageService imgServ;
    private final UserDetailsService userDetailsService;

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

    public void addRating(String id, Rating rating, Principal principal){
        Product product = this.getProductById(id);
        User principalUser = (User) userDetailsService.loadUserByUsername(principal.getName());

        List<Rating> existingRatings = product.getRatings();
        Optional<Rating> existingUserRatings = existingRatings.stream()
                .filter(r -> r.getUser().equals(principalUser))
                .findFirst();

        if(existingUserRatings.isPresent()){
            existingUserRatings.get().setRating(rating.getRating());
            ratingRepo.save(existingUserRatings.get());
        }else {
            rating.setProduct(product);
            rating.setUser(principalUser);
            product.addRating(rating);
            ratingRepo.save(rating);
        }

    }

    public Product updateAverageRating(String id){
        Product product = this.getProductById(id);
        Double avgRating = ratingRepo.calculateAverageRatingByProductId(id);
        product.setAvgRating(avgRating);
        return productRepo.save(product);

    }

    public void addReview(String id, Review review, Principal principal){
        Product existingProduct = this.getProductById(id);
        existingProduct.addReview(review);
        review.setProduct(existingProduct);
        User principalUser = (User) userDetailsService.loadUserByUsername(principal.getName());
        review.setUser(principalUser);
        principalUser.setTotalReviews(principalUser.getTotalReviews()+1);
        userRepo.save(principalUser);
        reviewRepo.save(review);
    }

    public String deleteProduct(String id){
        Product existingProduct = this.getProductById(id);
        List<String> results = imgServ.deleteFiles(existingProduct.getImages(),"Product");
        productRepo.delete(existingProduct);
        return "Delete Product by ID" + id;
    }

}
