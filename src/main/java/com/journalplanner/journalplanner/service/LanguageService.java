package com.journalplanner.journalplanner.service;

import com.journalplanner.journalplanner.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journalplanner.journalplanner.model.Language;

import java.util.Set;

@Service
public class LanguageService {
    @Autowired
    private LanguageRepository languageRepository;

    public Set<Language> getAllLanguages(){
        return languageRepository.findAll();
    }

    public Language getLanguageById(Integer id){
        return languageRepository.findById(id);
    }

    public Language createLanguage(Language language){
        return languageRepository.save(language);
    }

    public void deleteLanguageById(Integer id){
        languageRepository.deleteById(id);
    }
}
