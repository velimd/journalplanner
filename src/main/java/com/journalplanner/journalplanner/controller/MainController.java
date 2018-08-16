package com.journalplanner.journalplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.journalplanner.journalplanner.model.Resource;
import com.journalplanner.journalplanner.repository.ResourceRepository;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/resource")
public class MainController {
    @Autowired
    private ResourceRepository resourceRepository;

    @GetMapping(path="/add")
    public @ResponseBody String addNewResource(@RequestParam String name, @RequestParam String url, @RequestParam String memo){
        Resource r = new Resource();
        r.setName(name);
        r.setUrl(url);
        r.setMemo(memo);
        resourceRepository.save(r);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Resource> getAllResources(){
        return resourceRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Resource getResourceById(@PathVariable(value="id") Integer id){
        return resourceRepository.findById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Resource addResource(@RequestBody Resource resource){
        return resourceRepository.save(resource);
    }

    @PutMapping("/{id}")
    public Resource updateResource(@PathVariable(value = "id") Integer id, @RequestBody Resource resource){
        resourceRepository.findById(id); //make a check method to see if the id does exist.
        resource.setId(id);
        return resourceRepository.save(resource);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteResourceById(@PathVariable(value = "id") Integer id){
        resourceRepository.deleteById(id);
    }
}
