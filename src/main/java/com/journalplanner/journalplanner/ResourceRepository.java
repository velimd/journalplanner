package com.journalplanner.journalplanner;

import org.springframework.data.repository.CrudRepository;

import com.journalplanner.journalplanner.Resource;

public interface ResourceRepository extends CrudRepository<Resource, Long> {
}
