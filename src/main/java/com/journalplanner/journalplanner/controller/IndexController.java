package com.journalplanner.journalplanner.controller;

import java.util.List;

import com.journalplanner.journalplanner.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

import com.journalplanner.journalplanner.Resource;
import com.journalplanner.journalplanner.ResourceRepository;

@Controller
public class IndexController {
    @Autowired
    private ResourceRepository resourceRepository;

    @RequestMapping("/")
    public String index(Model model) {
        List<Resource> resources =  resourceRepository.findAll();
        model.addAttribute("resources", resources);
        return "index";
    }
}
