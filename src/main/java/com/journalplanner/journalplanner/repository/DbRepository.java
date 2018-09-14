package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Db;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DbRepository extends CrudRepository<Db, Long> {
    List<Db> findAllByOrderByIdAsc();
    void deleteById(Integer id);
    Db findById(Integer id);
}
