package com.ezalia.demo.repositories;

import com.ezalia.demo.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review,String> {

    List<Review> findByProduct_Id(String id);

}
