package com.journalplanner.journalplanner.service;

import com.journalplanner.journalplanner.repository.DbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journalplanner.journalplanner.model.Db;

import java.util.Set;

@Service
public class DbService {
    @Autowired
    private DbRepository dbRepository;

    public Set<Db> getAllDbs(){
        return dbRepository.findAllByOrderByIdAsc();
    }

    public Db getDbById(Integer id){
        return dbRepository.findById(id);
    }

    public Db createDb(Db db){
        return dbRepository.save(db);
    }

    public void deleteDbById(Integer id){
        dbRepository.deleteById(id);
    }
}
