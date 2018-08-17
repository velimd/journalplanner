package com.journalplanner.journalplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.journalplanner.journalplanner.model.Project;
import com.journalplanner.journalplanner.repository.ProjectRepository;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/project")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Project getProjectById(@PathVariable(value="id") Integer id){
        return projectRepository.findById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Project addProject(@RequestBody Project project){
        return projectRepository.save(project);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable(value = "id") Integer id, @RequestBody Project project){
        projectRepository.findById(id); //make a check method to see if the id does exist.
        project.setId(id);
        return projectRepository.save(project);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteProjectById(@PathVariable(value = "id") Integer id){
        projectRepository.deleteById(id);
    }
}
