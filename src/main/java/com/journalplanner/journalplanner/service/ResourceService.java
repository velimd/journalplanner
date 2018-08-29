package com.journalplanner.journalplanner.service;

import com.journalplanner.journalplanner.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journalplanner.journalplanner.model.Resource;

import java.util.Set;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;

    public Set<Resource> getAllResources(){
        return resourceRepository.findAll();
    }

    public Resource getResourceById(Integer id){
        return resourceRepository.findById(id);
    }

    public Resource createResource(Resource resource){
        return resourceRepository.save(resource);
    }

    public void deleteResourceById(Integer id){
        resourceRepository.deleteById(id);
    }
}
