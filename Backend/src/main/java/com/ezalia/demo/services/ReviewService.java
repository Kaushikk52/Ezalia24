package com.ezalia.demo.services;

import com.ezalia.demo.models.Review;
import com.ezalia.demo.repositories.ReviewRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewService {
    private final ReviewRepo reviewRepo;

    public List<Review> getReviewsByProduct(String id){
        List<Review> productReviews = reviewRepo.findByProduct_Id(id);
        return  productReviews;
    }
}
