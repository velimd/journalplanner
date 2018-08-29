package com.journalplanner.journalplanner.controller;

import com.journalplanner.journalplanner.model.Db;
import com.journalplanner.journalplanner.service.DbService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/db")
public class DbController {
    @Autowired
    private DbService dbService;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Db> getAllDbs(){
        return dbService.getAllDbs();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Db getDbById(@PathVariable(value="id") Integer id){
        return dbService.getDbById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Db addDb(@RequestBody Db framework){
        return dbService.createDb(framework);
    }

    @PutMapping("/{id}")
    public Db updateDb(@PathVariable(value = "id") Integer id, @RequestBody Db framework){
        framework.setId(id);
        return dbService.createDb(framework);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteDbById(@PathVariable(value = "id") Integer id){
        dbService.deleteDbById(id);
    }
}
