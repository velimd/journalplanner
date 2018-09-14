package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Technology;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface TechnologyRepository extends CrudRepository<Technology, Long> {
    Set<Technology> findAllByOrderByIdAsc();
    void deleteById(Integer id);
    Technology findById(Integer id);
}
