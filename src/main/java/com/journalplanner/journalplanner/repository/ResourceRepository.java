package com.journalplanner.journalplanner.repository;

import org.springframework.data.repository.CrudRepository;

import com.journalplanner.journalplanner.model.Resource;

import java.util.Set;

public interface ResourceRepository extends CrudRepository<Resource, Long> {
    Set<Resource> findAll();
    void deleteById(Integer id);
    Resource findById(Integer id);
}
