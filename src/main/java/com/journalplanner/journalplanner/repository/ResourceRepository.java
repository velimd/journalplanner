package com.journalplanner.journalplanner.repository;

import org.springframework.data.repository.CrudRepository;

import com.journalplanner.journalplanner.model.Resource;

import java.util.List;

public interface ResourceRepository extends CrudRepository<Resource, Long> {
    List<Resource> findAll();
    void deleteById(Integer id);
    Resource findById(Integer id);
}
