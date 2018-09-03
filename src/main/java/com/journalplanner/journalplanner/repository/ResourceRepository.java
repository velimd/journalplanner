package com.journalplanner.journalplanner.repository;

import org.springframework.data.repository.CrudRepository;

import com.journalplanner.journalplanner.model.Resource;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ResourceRepository extends CrudRepository<Resource, Long> {
    Set<Resource> findAllByOrderByIdAsc();
    Resource findById(Integer id);
    void deleteById(Integer id);
    Set<Resource> findByNameContainingIgnoreCaseOrUrlContainingIgnoreCaseOrMemoContainingIgnoreCaseOrLanguages_NameContainingIgnoreCaseOrFrameworks_NameContainingIgnoreCaseOrTechnologies_NameContainingIgnoreCaseOrDbs_NameContainingIgnoreCase(String name, String url, String memo, String language,String framework,String technology,String db);
}
