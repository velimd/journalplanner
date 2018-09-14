package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Db;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface DbRepository extends CrudRepository<Db, Long> {
    Set<Db> findAllByOrderByIdAsc();
    void deleteById(Integer id);
    Db findById(Integer id);
}
