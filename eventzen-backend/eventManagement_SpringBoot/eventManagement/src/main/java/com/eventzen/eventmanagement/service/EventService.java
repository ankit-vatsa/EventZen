package com.eventzen.eventmanagement.service;

import com.eventzen.eventmanagement.entity.Event;
import com.eventzen.eventmanagement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Integer id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Integer id, Event eventDetails) {
        Event event = eventRepository.findById(id).orElseThrow();
        event.setName(eventDetails.getName());
        event.setDate(eventDetails.getDate());
        event.setVenueId(eventDetails.getVenueId());
        event.setCreatedBy(eventDetails.getCreatedBy());
        event.setCost(eventDetails.getCost());
        return eventRepository.save(event);
    }

    public void deleteEvent(Integer id) {
        eventRepository.deleteById(id);
    }
}
