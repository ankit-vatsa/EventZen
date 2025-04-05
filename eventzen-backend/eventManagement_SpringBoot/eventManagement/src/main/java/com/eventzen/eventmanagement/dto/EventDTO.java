package com.eventzen.eventmanagement.dto;

import java.time.LocalDateTime;

public class EventDTO {

    private Integer id;
    private String name;
    private LocalDateTime date;
    private Integer venueId;
    private Integer createdBy;
    private Double cost;

    // Constructors
    public EventDTO() {
    }

    public EventDTO(Integer id, String name, LocalDateTime date, Integer venueId, Integer createdBy, Double cost) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.venueId = venueId;
        this.createdBy = createdBy;
        this.cost = cost;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Integer getVenueId() {
        return venueId;
    }

    public void setVenueId(Integer venueId) {
        this.venueId = venueId;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
}
