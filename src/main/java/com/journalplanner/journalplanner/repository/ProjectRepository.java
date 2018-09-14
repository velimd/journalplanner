package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    List<Project> findAllByOrderByIdAsc();
    Project findById(Integer id);
    void deleteById(Integer id);
}
