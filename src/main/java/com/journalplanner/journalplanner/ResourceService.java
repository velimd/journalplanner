package com.journalplanner.journalplanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journalplanner.journalplanner.ResourceRepository;

@Service
public class ResourceService {
    @Autowired private ResourceRepository resourceRepository;
}
