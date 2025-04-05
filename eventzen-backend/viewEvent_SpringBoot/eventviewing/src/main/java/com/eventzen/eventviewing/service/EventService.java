package com.eventzen.eventviewing.service;

import com.eventzen.eventviewing.dto.EventResponseDTO;
import com.eventzen.eventviewing.entity.Event;
import com.eventzen.eventviewing.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<EventResponseDTO> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream().map(EventResponseDTO::fromEntity).collect(Collectors.toList());
    }

//    public List<EventResponseDTO> getEventsByLocation(String location) {
//        List<Event> events = eventRepository.findByVenue_Location(location);
//        return events.stream().map(EventResponseDTO::fromEntity).collect(Collectors.toList());
//    }
public List<EventResponseDTO> getEventsByLocation(String location) {
    List<Event> events = eventRepository.findByVenue_LocationLike(location);
    return events.stream().map(EventResponseDTO::fromEntity).collect(Collectors.toList());
}

    public List<EventResponseDTO> getEventsSortedByPrice(String order) {
        List<Event> events;
        if (order.equalsIgnoreCase("asc")) {
            events = eventRepository.findAllByOrderByCostAsc();
        } else {
            events = eventRepository.findAllByOrderByCostDesc();
        }
        return events.stream().map(EventResponseDTO::fromEntity).collect(Collectors.toList());
    }
}
