package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Project;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<Project, Long> {
}
