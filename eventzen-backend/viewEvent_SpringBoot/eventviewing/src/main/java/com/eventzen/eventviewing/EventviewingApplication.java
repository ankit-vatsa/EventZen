package com.eventzen.eventviewing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.eventzen")
public class EventviewingApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventviewingApplication.class, args);
    }

}
