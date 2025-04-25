package com.ezalia.demo.services;

import com.ezalia.demo.models.Rating;
import com.ezalia.demo.repositories.RatingRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RatingService {
    private final RatingRepo ratingRepo;

    public List<Rating> getRatingsByRating(String id){
        List<Rating> ratings = ratingRepo.findByProduct_Id(id);
        return ratings;
    }

}
