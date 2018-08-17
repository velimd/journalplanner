package com.journalplanner.journalplanner.controller;

import com.journalplanner.journalplanner.model.Language;
import com.journalplanner.journalplanner.repository.LanguageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/language")
public class LanguageController {
    @Autowired
    private LanguageRepository languageRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Language> getAllLanguages(){
        return languageRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Language getLanguageById(@PathVariable(value="id") Integer id){
        return languageRepository.findById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Language addLanguage(@RequestBody Language language){
        return languageRepository.save(language);
    }

    @PutMapping("/{id}")
    public Language updateLanguage(@PathVariable(value = "id") Integer id, @RequestBody Language language){
        languageRepository.findById(id); //make a check method to see if the id does exist.
        language.setId(id);
        return languageRepository.save(language);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteLanguageById(@PathVariable(value = "id") Integer id){
        languageRepository.deleteById(id);
    }
}
