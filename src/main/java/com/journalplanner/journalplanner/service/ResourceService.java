package com.journalplanner.journalplanner.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journalplanner.journalplanner.repository.ResourceRepository;

@Service
public class ResourceService {
    @Autowired private ResourceRepository resourceRepository;
}
