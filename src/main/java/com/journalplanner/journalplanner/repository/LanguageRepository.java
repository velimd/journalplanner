package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Language;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface LanguageRepository extends CrudRepository<Language, Long> {
    Set<Language> findAllByOrderByIdAsc();
    void deleteById(Integer id);
    Language findById(Integer id);
}
