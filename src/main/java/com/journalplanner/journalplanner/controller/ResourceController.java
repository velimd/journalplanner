package com.journalplanner.journalplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public @ResponseBody Resource getResourceById(@PathVariable(value="id") Integer id){
        return resourceService.getResourceById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Resource addResource(@RequestBody Resource resource){
        return resourceService.createResource(resource);
    }

    @PutMapping("/{id}")
    public Resource updateResource(@PathVariable(value = "id") Integer id, @RequestBody Resource resource){
        resource.setId(id);
        return resourceService.createResource(resource);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteResourceById(@PathVariable(value = "id") Integer id){
        resourceService.deleteResourceById(id);
    }
}
