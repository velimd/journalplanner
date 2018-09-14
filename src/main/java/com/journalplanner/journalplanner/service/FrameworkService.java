package com.journalplanner.journalplanner.service;

import com.journalplanner.journalplanner.repository.FrameworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journalplanner.journalplanner.model.Framework;

import java.util.Set;

@Service
public class FrameworkService {
    @Autowired
    private FrameworkRepository frameworkRepository;

    public Set<Framework> getAllFrameworks(){
        return frameworkRepository.findAllByOrderByIdAsc();
    }

    public Framework getFrameworkById(Integer id){
        return frameworkRepository.findById(id);
    }

    public Framework createFramework(Framework framework){
        return frameworkRepository.save(framework);
    }

    public void deleteFrameworkById(Integer id){
        frameworkRepository.deleteById(id);
    }
}
