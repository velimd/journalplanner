package com.journalplanner.journalplanner.service;

import com.journalplanner.journalplanner.repository.TechnologyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journalplanner.journalplanner.model.Technology;

import java.util.List;

@Service
public class TechnologyService {
    @Autowired
    private TechnologyRepository technologyRepository;

    public List<Technology> getAllTechnologies(){
        return technologyRepository.findAllByOrderByIdAsc();
    }

    public Technology getTechnologyById(Integer id){
        return technologyRepository.findById(id);
    }

    public Technology createTechnology(Technology technology){
        return technologyRepository.save(technology);
    }

    public void deleteTechnologyById(Integer id){
        technologyRepository.deleteById(id);
    }
}
