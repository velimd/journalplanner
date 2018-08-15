package com.journalplanner.journalplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.journalplanner.journalplanner.Resource;
import com.journalplanner.journalplanner.ResourceRepository;

@Controller
@RequestMapping(path="/database")
public class MainController {
    @Autowired
    private ResourceRepository resourceRepository;

    @GetMapping(path="/add")
    public @ResponseBody String addNewResource(@RequestParam String name, @RequestParam String url){
        Resource r = new Resource();
        r.setName(name);
        r.setUrl(url);
        resourceRepository.save(r);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Resource> getAllResources(){
        return resourceRepository.findAll();
    }
}
