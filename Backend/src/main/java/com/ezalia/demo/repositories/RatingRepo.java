package com.ezalia.demo.repositories;

import com.ezalia.demo.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepo extends JpaRepository<Rating,String> {

    @Query("SELECT COALESCE(AVG(r.rating),0) FROM Rating r WHERE r.product.id = :productId")
    Double calculateAverageRatingByProductId(@Param("productId") String productId);

    List<Rating> findByProduct_Id(String id);

}
