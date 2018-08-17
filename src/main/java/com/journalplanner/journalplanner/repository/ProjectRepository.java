package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Project;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface ProjectRepository extends CrudRepository<Project, Long> {
    Set<Project> findAll();
    void deleteById(Integer id);
    Project findById(Integer id);
}
