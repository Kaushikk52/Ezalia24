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
    private String name;
    private String sku;
    private String price;
    private String description;
}
