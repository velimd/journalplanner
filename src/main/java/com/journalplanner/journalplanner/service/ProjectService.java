package com.journalplanner.journalplanner.service;

import com.journalplanner.journalplanner.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journalplanner.journalplanner.model.Project;

import java.util.Set;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Set<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    public Project getProjectById(Integer id){
        return projectRepository.findById(id);
    }

    public Project createProject(Project project){
        return projectRepository.save(project);
    }

    public void deleteProjectById(Integer id){
        projectRepository.deleteById(id);
    }

    public Set<Project> getProjectsBySearch(String name, String url, String language,String framework,String technology,String db){
        return projectRepository.findByNameContainingIgnoreCaseOrUrlContainingIgnoreCaseOrLanguages_NameContainingIgnoreCaseOrFrameworks_NameContainingIgnoreCaseOrTechnologies_NameContainingIgnoreCaseOrDbs_NameContainingIgnoreCase(name, url, language, framework, technology, db);
    }
}
