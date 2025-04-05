package com.eventzen.venuemanagement.repository;

import com.eventzen.venuemanagement.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue, Long> {
}
