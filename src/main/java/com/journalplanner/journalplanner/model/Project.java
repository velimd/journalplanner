package com.journalplanner.journalplanner.model;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "language", nullable = true)
    private ArrayList<Language> language;

    @Column(name = "framework", nullable = true)
    private ArrayList<Framework> framework;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public ArrayList<Language> getLanguage() {
        return language;
    }
    public void setLanguage(ArrayList<Language> language) {
        this.language = language;
    }
    public ArrayList<Framework> getFramework() {
        return framework;
    }
    public void setFramework(ArrayList<Framework> framework) {
        this.framework = framework;
    }
}
