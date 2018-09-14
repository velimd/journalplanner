package com.journalplanner.journalplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.journalplanner.journalplanner.model.Resource;
import com.journalplanner.journalplanner.service.ResourceService;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/resource")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    /*@GetMapping(path="/add")
    public @ResponseBody String addNewResource(@RequestParam String name, @RequestParam String url, @RequestParam String memo){
        Resource r = new Resource();
        r.setName(name);
        r.setUrl(url);
        r.setMemo(memo);
        resourceService.save(r);
        return "Saved";
    }*/

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Resource> getAllResources(){
        return resourceService.getAllResources();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity getResourceById(@PathVariable(value="id") Integer id){

        Resource resource = resourceService.getResourceById(id);
        if (resource != null){
            return new ResponseEntity(resource, HttpStatus.OK);
        }
        else {
            return new ResponseEntity("Resource Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity addResource(@RequestBody Resource resource){
        if(resourceService.getResourceById(resource.getId())==null) {
            if(resource.getId()==null) {
                if (resource.getName() != null && resource.getUrl() != null) {
                    Resource newResource = resourceService.createResource(resource);
                    return new ResponseEntity(newResource, HttpStatus.CREATED);
                } else {
                    return new ResponseEntity("Please Enter Name AND Url", HttpStatus.NOT_ACCEPTABLE);
                }
            }
            else {
                return new ResponseEntity("Please Remove Id", HttpStatus.NOT_ACCEPTABLE);
            }
        }
        else {
            return new ResponseEntity("The Resource With that Idea Already Exist", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateResource(@PathVariable(value = "id") Integer id, @RequestBody Resource resource){
        Resource oldResource = resourceService.getResourceById(id);
        if(oldResource != null){
            if (resource.getName()==null){
                resource.setName(oldResource.getName());
            }
            if (resource.getUrl()==null){
                resource.setUrl(oldResource.getUrl());
            }
            if (resource.getMemo()==null){
                resource.setMemo(oldResource.getMemo());
            }
            if (resource.getLanguages()==null){
                resource.setLanguages(oldResource.getLanguages());
            }
            if (resource.getFrameworks()==null){
                resource.setFrameworks(oldResource.getFrameworks());
            }
            if (resource.getTechnologies()==null){
                resource.setTechnologies(oldResource.getTechnologies());
            }
            if (resource.getDbs()==null){
                resource.setDbs(oldResource.getDbs());
            }
            resource.setId(id);
            Resource newResource = resourceService.createResource(resource);
            return new ResponseEntity(newResource, HttpStatus.OK);
        }
        else {
            return new ResponseEntity("Resource Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity deleteResourceById(@PathVariable(value = "id") Integer id){
        if (resourceService.getResourceById(id) != null){
            resourceService.deleteResourceById(id);
            return new ResponseEntity("Deleted Resource", HttpStatus.OK);
        }
        else {
            return new ResponseEntity("Resource Not Found", HttpStatus.NOT_FOUND);
        }
    }
}
