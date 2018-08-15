package com.journalplanner.journalplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.journalplanner.journalplanner.Resource;
import com.journalplanner.journalplanner.ResourceRepository;

import javax.transaction.Transactional;

@Controller
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

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteResourceById(@PathVariable(value = "id") Integer id){
        resourceRepository.deleteById(id);
    }

    /*@PostMapping("/add")
    public @ResponseBody String addResource(@RequestBody Resource resource){
        resourceRepository.save(resource);
        return "Saved Resources";
    }*/
}
