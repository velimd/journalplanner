package com.journalplanner.journalplanner.service;

import com.journalplanner.journalplanner.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journalplanner.journalplanner.model.Resource;

import java.util.List;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;

    public List<Resource> getAllResources(){
        return resourceRepository.findAllByOrderByIdAsc();
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
