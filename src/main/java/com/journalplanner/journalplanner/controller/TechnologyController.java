package com.journalplanner.journalplanner.controller;

import com.journalplanner.journalplanner.model.Technology;
import com.journalplanner.journalplanner.service.TechnologyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/technology")
public class TechnologyController {
    @Autowired
    private TechnologyService technologyService;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Technology> getAllTechnology(){
        return technologyService.getAllTechnologies();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Technology getTechnologyById(@PathVariable(value="id") Integer id){
        return technologyService.getTechnologyById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Technology addTechnology(@RequestBody Technology technology){
        return technologyService.createTechnology(technology);
    }

    @PutMapping("/{id}")
    public Technology updateTechnology(@PathVariable(value = "id") Integer id, @RequestBody Technology technology){
        technology.setId(id);
        return technologyService.createTechnology(technology);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteTechnologyById(@PathVariable(value = "id") Integer id){
        technologyService.deleteTechnologyById(id);
    }
}
