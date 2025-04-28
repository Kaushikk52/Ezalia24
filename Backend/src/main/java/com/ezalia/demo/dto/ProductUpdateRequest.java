package com.ezalia.demo.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductUpdateRequest {
    private List<String> imagesToDelete;
    private List<String> images;
    private String name;
    private String sku;
    private Double price;
    private String description;
}
