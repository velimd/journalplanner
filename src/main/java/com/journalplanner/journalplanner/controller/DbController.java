package com.journalplanner.journalplanner.controller;

import com.journalplanner.journalplanner.model.Db;
import com.journalplanner.journalplanner.repository.DbRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/db")
public class DbController {
    @Autowired
    private DbRepository dbRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Db> getAllDbs(){
        return dbRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Db getDbById(@PathVariable(value="id") Integer id){
        return dbRepository.findById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Db addDb(@RequestBody Db framework){
        return dbRepository.save(framework);
    }

    @PutMapping("/{id}")
    public Db updateDb(@PathVariable(value = "id") Integer id, @RequestBody Db framework){
        dbRepository.findById(id); //make a check method to see if the id does exist.
        framework.setId(id);
        return dbRepository.save(framework);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteDbById(@PathVariable(value = "id") Integer id){
        dbRepository.deleteById(id);
    }
}
