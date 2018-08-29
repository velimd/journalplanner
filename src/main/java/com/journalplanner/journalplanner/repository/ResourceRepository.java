package com.journalplanner.journalplanner.repository;

import org.springframework.data.repository.CrudRepository;

import com.journalplanner.journalplanner.model.Resource;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ResourceRepository extends CrudRepository<Resource, Long> {
    Set<Resource> findAll();
    Resource findById(Integer id);
    void deleteById(Integer id);
}
