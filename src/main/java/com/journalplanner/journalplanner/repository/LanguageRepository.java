package com.journalplanner.journalplanner.repository;

import com.journalplanner.journalplanner.model.Language;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends CrudRepository<Language, Long> {
    List<Language> findAllByOrderByIdAsc();
    void deleteById(Integer id);
    Language findById(Integer id);
}
