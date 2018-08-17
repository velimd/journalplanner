package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Framework;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface FrameworkRepository extends CrudRepository<Framework, Long> {
    Set<Framework> findAll();
    void deleteById(Integer id);
    Framework findById(Integer id);
}
