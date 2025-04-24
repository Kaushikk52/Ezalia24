package com.ezalia.demo.models;

import com.ezalia.demo.helper.StringListConverter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Product extends Auditable{

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    private String sku;

    @NotNull(message = "Product name cannot be null")
    @Size(min = 3, max = 50, message = "Project name must be between 3 and 50 characters")
    @Column(nullable = false, length = 50)
    private String name;

    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @Column(name = "images", columnDefinition = "json")
    @Convert(converter = StringListConverter.class)
    private List<String> images = new ArrayList<>();

    private double price;
    private int stock;
    private List<String> category;
    private List<String> tags;

    private Double avgRating;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"product", "user"})
    private List<Rating> ratings= new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"product", "user"})
    private List<Review> reviews= new ArrayList<>();

    private Boolean isSaved;

    public void addRating(Rating rating) {
        if (this.ratings == null) {
            this.ratings = new ArrayList<>();
        }
        this.ratings.add(rating);
        rating.setProduct(this);
    }

    public void addReview(Review review) {
        if (this.reviews == null) {
            this.reviews = new ArrayList<>();
        }
        this.reviews.add(review);
        review.setProduct(this);
    }

}
