package com.eventzen.eventviewing.repository;

import com.eventzen.eventviewing.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue, Integer> {
}
