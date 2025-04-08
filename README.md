<h1>EventZen - Event Management Company</h1>

<h2>Full Stack Web Application</h2>

``Overview of Tables``

| Table Name      | Description                     | Columns                                             |
|-----------------|---------------------------------|-----------------------------------------------------|
| users           | Store user details              | id, name, email, password_hash, role, status        |
| events          | Manage event details            | id, name, venue_id, created_by, date, cost          |
| venues          | Store venue info                | id, name, capacity, location                        |
| attendees       | Track event attendees           | id, user_id, event_id, status                       |
| vendors         | Store vendor details            | id, name, service_type, contact_info                |
| event_vendors   | Link vendors to events          | id, event_id, vendor_id                             |
| bookings        | Track customer bookings         | id, user_id, event_id, venue_id, status             |

<hr>

**Justification for Tech Choice**

``Backend``
* Node.js: Best for handling authentication, real-time updates (User Management, Attendees, Bookings).
* Spring Boot: Strong for structured business logic (Events Management, Event Vieweing, Venues).
* .NET: Best for handling structured enterprise data (Vendors, financials).

``Frontend``
* React: Framework: React -> Variant: JavaScript.
