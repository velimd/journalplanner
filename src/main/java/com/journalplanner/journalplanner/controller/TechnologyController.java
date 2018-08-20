package com.journalplanner.journalplanner.controller;

import com.journalplanner.journalplanner.model.Technology;
import com.journalplanner.journalplanner.repository.TechnologyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/technology")
public class TechnologyController {
    @Autowired
    private TechnologyRepository technologyRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Technology> getAllTechnology(){
        return technologyRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Technology getTechnologyById(@PathVariable(value="id") Integer id){
        return technologyRepository.findById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Technology addTechnology(@RequestBody Technology technology){
        return technologyRepository.save(technology);
    }

    @PutMapping("/{id}")
    public Technology updateTechnology(@PathVariable(value = "id") Integer id, @RequestBody Technology technology){
        technologyRepository.findById(id); //make a check method to see if the id does exist.
        technology.setId(id);
        return technologyRepository.save(technology);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteTechnologyById(@PathVariable(value = "id") Integer id){
        technologyRepository.deleteById(id);
    }
}
