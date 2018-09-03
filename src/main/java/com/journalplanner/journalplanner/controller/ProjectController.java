package com.journalplanner.journalplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.journalplanner.journalplanner.model.Project;
import com.journalplanner.journalplanner.service.ProjectService;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Project> getAllProjects(){
        return projectService.getAllProjects();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Project getProjectById(@PathVariable(value="id") Integer id){
        return projectService.getProjectById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Project addProject(@RequestBody Project project){
        return projectService.createProject(project);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable(value = "id") Integer id, @RequestBody Project project){
        project.setId(id);
        return projectService.createProject(project);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteProjectById(@PathVariable(value = "id") Integer id){
        projectService.deleteProjectById(id);
    }

    @GetMapping(path="/search/{search}")
    public @ResponseBody Iterable<Project> getGetProjectBySearch(@PathVariable(value="search") String search){
        return projectService.getProjectsBySearch(search, search, search, search, search, search);
    }
}
