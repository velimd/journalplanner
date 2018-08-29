package com.journalplanner.journalplanner.controller;

import com.journalplanner.journalplanner.model.Language;
import com.journalplanner.journalplanner.service.LanguageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@RequestMapping(path="/api/language")
public class LanguageController {
    @Autowired
    private LanguageService languageService;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Language> getAllLanguages(){
        return languageService.getAllLanguages();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Language getLanguageById(@PathVariable(value="id") Integer id){
        return languageService.getLanguageById(id); //if statement to return message if the id doesnt exist.
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Language addLanguage(@RequestBody Language language){
        return languageService.createLanguage(language);
    }

    @PutMapping("/{id}")
    public Language updateLanguage(@PathVariable(value = "id") Integer id, @RequestBody Language language){
        language.setId(id);
        return languageService.createLanguage(language);

    }

    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public void deleteLanguageById(@PathVariable(value = "id") Integer id){
        languageService.deleteLanguageById(id);
    }
}
