package com.journalplanner.journalplanner.controller;

import com.journalplanner.journalplanner.model.Framework;
import com.journalplanner.journalplanner.repository.FrameworkRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/framework")
public class FrameworkController {
    @Autowired
    private FrameworkRepository frameworkRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Framework> getAllFrameworks(){
        return frameworkRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Framework getFrameworkById(@PathVariable(value="id") Integer id){
        return frameworkRepository.findById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Framework addFramework(@RequestBody Framework framework){
        return frameworkRepository.save(framework);
    }

    @PutMapping("/{id}")
    public Framework updateFramework(@PathVariable(value = "id") Integer id, @RequestBody Framework framework){
        frameworkRepository.findById(id); //make a check method to see if the id does exist.
        framework.setId(id);
        return frameworkRepository.save(framework);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteFrameworkById(@PathVariable(value = "id") Integer id){
        frameworkRepository.deleteById(id);
    }
}
