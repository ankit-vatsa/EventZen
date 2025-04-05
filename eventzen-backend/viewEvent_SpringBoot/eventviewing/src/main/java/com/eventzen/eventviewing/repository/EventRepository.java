package com.eventzen.eventviewing.repository;

import com.eventzen.eventviewing.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

//    List<Event> findByVenue_Location(String location);
@Query("SELECT e FROM Event e JOIN e.venue v WHERE v.location LIKE %:location%")
List<Event> findByVenue_LocationLike(String location);

    List<Event> findAllByOrderByCostAsc();

    List<Event> findAllByOrderByCostDesc();
}
