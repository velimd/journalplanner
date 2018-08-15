package com.journalplanner.journalplanner;

import org.springframework.data.repository.CrudRepository;

import com.journalplanner.journalplanner.Resource;

import java.util.List;

public interface ResourceRepository extends CrudRepository<Resource, Long> {
    List<Resource> findAll();
}
