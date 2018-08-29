package com.journalplanner.journalplanner.controller;

import com.journalplanner.journalplanner.model.Framework;
import com.journalplanner.journalplanner.service.FrameworkService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/framework")
public class FrameworkController {
    @Autowired
    private FrameworkService frameworkService;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Framework> getAllFrameworks(){
        return frameworkService.getAllFrameworks();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Framework getFrameworkById(@PathVariable(value="id") Integer id){
        return frameworkService.getFrameworkById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Framework addFramework(@RequestBody Framework framework){
        return frameworkService.createFramework(framework);
    }

    @PutMapping("/{id}")
    public Framework updateFramework(@PathVariable(value = "id") Integer id, @RequestBody Framework framework){
        framework.setId(id);
        return frameworkService.createFramework(framework);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteFrameworkById(@PathVariable(value = "id") Integer id){
        frameworkService.deleteFrameworkById(id);
    }
}
