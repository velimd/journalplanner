package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    Set<Project> findAllByOrderByIdAsc();
    Project findById(Integer id);
    void deleteById(Integer id);
}
