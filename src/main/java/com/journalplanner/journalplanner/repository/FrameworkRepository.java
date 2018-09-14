package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Framework;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FrameworkRepository extends CrudRepository<Framework, Long> {
    List<Framework> findAllByOrderByIdAsc();
    void deleteById(Integer id);
    Framework findById(Integer id);
}
