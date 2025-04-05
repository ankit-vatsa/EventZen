package com.eventzen.eventviewing.dto;

import java.time.LocalDateTime;

public class EventResponseDTO {
    private String eventName;
    private LocalDateTime eventDate;
    private double eventCost;
    private String venueName;
    private String venueLocation;

    public EventResponseDTO(String eventName, LocalDateTime eventDate, double eventCost, String venueName, String venueLocation) {
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.eventCost = eventCost;
        this.venueName = venueName;
        this.venueLocation = venueLocation;
    }

    // Getters and Setters
    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public LocalDateTime getEventDate() { return eventDate; }
    public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }

    public double getEventCost() { return eventCost; }
    public void setEventCost(double eventCost) { this.eventCost = eventCost; }

    public String getVenueName() { return venueName; }
    public void setVenueName(String venueName) { this.venueName = venueName; }

    public String getVenueLocation() { return venueLocation; }
    public void setVenueLocation(String venueLocation) { this.venueLocation = venueLocation; }

    // Static factory method for creating DTO from entity
    public static EventResponseDTO fromEntity(com.eventzen.eventviewing.entity.Event event) {
        return new EventResponseDTO(
                event.getName(),
                event.getDate(),
                event.getCost(),
                event.getVenue().getName(),
                event.getVenue().getLocation()
        );
    }
}

//package com.eventzen.eventviewing.dto;
//
//import com.eventzen.eventviewing.entity.Event;
//import lombok.Data;
//import java.time.LocalDateTime;
//
//@Data
//public class EventResponseDTO {
//    private String eventName;
//    private LocalDateTime eventDate;
//    private Double eventCost;
//    private String venueName;
//
//    public static EventResponseDTO fromEntity(Event event) {
//        EventResponseDTO dto = new EventResponseDTO();
//        dto.setEventName(event.getName());
//        dto.setEventDate(event.getDate());
//        dto.setEventCost(event.getCost());
//        dto.setVenueName(event.getVenue().getName());
//        return dto;
//    }
//}
