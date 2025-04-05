package com.eventzen.eventviewing.controller;

import com.eventzen.eventviewing.dto.EventResponseDTO;
import com.eventzen.eventviewing.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // ✅ Get all events with venue details
    @GetMapping
    public List<EventResponseDTO> getAllEvents() {
        return eventService.getAllEvents();
    }

    // ✅ Get events filtered by location
    @GetMapping("/location/{location}")
    public List<EventResponseDTO> getEventsByLocation(@PathVariable String location) {
        return eventService.getEventsByLocation(location);
    }

    // ✅ Sort events by price (high to low OR low to high)
    @GetMapping("/sort/price")
    public List<EventResponseDTO> getEventsSortedByPrice(@RequestParam String order) {
        return eventService.getEventsSortedByPrice(order);
    }
}
