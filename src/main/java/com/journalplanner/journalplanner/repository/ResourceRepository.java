package com.journalplanner.journalplanner.repository;

import org.springframework.data.repository.CrudRepository;
import com.journalplanner.journalplanner.model.Resource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends CrudRepository<Resource, Long> {
    List<Resource> findAllByOrderByIdAsc();
    Resource findById(Integer id);
    void deleteById(Integer id);
}
