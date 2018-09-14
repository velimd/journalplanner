package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Technology;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechnologyRepository extends CrudRepository<Technology, Long> {
    List<Technology> findAllByOrderByIdAsc();
    void deleteById(Integer id);
    Technology findById(Integer id);
}
