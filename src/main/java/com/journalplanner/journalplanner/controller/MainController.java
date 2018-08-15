package com.journalplanner.journalplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.journalplanner.journalplanner.Resource;
import com.journalplanner.journalplanner.ResourceRepository;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api")
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

    @GetMapping(path = "resource/{id}")
    public @ResponseBody Resource getResourceById(@PathVariable(value="id") Integer id){
        return resourceRepository.findById(id);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Resource addResource(@RequestBody Resource resource){
        return resourceRepository.save(resource);
    }

    @PutMapping("/resource/{id}")
    public Resource updateResource(@PathVariable(value = "id") Integer id, @RequestBody Resource resource){
        resourceRepository.findById(id);
        resource.setId(id);
        return resourceRepository.save(resource);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteResourceById(@PathVariable(value = "id") Integer id){
        resourceRepository.deleteById(id);
    }
}
