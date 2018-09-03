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

    public Set<Resource> getResourcesBySearch(String name, String url, String memo, String language,String framework,String technology,String db){
        return resourceRepository.findByNameContainingIgnoreCaseOrUrlContainingIgnoreCaseOrMemoContainingIgnoreCaseOrLanguages_NameContainingIgnoreCaseOrFrameworks_NameContainingIgnoreCaseOrTechnologies_NameContainingIgnoreCaseOrDbs_NameContainingIgnoreCase(name, url, memo, language, framework, technology, db);
    }
}
