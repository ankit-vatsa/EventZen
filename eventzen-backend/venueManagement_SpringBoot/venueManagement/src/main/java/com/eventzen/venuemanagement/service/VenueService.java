package com.eventzen.venuemanagement.service;

import com.eventzen.venuemanagement.model.Venue;
import com.eventzen.venuemanagement.repository.VenueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VenueService {

    private final VenueRepository venueRepository;

    public VenueService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Optional<Venue> getVenueById(Long id) {
        return venueRepository.findById(id);
    }

    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    public Venue updateVenue(Long id, Venue venueDetails) {
        Venue existingVenue = venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venue with ID " + id + " not found."));

        // Update only if the venue exists
        existingVenue.setName(venueDetails.getName());
        existingVenue.setLocation(venueDetails.getLocation());
        existingVenue.setCapacity(venueDetails.getCapacity());

        return venueRepository.save(existingVenue);
    }

    public void deleteVenue(Long id) {
        venueRepository.deleteById(id);
    }
}
