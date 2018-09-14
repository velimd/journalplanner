package com.journalplanner.journalplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "project")
public class Project {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "url", nullable = false)
    private String url;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "project_language", joinColumns = { @JoinColumn(name = "project_id") }, inverseJoinColumns = { @JoinColumn(name = "language_id") })
    @Column(name = "language", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    @OrderBy("id")
    private List<Language> languages = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "project_framework", joinColumns = { @JoinColumn(name = "project_id") }, inverseJoinColumns = { @JoinColumn(name = "framework_id") })
    @Column(name = "framework", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    @OrderBy("id")
    private List<Framework> frameworks = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "project_technology", joinColumns = { @JoinColumn(name = "project_id") }, inverseJoinColumns = { @JoinColumn(name = "technology_id") })
    @Column(name = "technology", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    @OrderBy("id")
    private List<Technology> technologies = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "project_db", joinColumns = { @JoinColumn(name = "project_id") }, inverseJoinColumns = { @JoinColumn(name = "db_id") })
    @Column(name = "db", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    @OrderBy("id")
    private List<Db> dbs = new ArrayList<>();

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
    public List<Language> getLanguages() {
        return languages;
    }
    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }
    public List<Framework> getFrameworks() {
        return frameworks;
    }
    public void setFrameworks(List<Framework> frameworks) {
        this.frameworks = frameworks;
    }
    public List<Technology> getTechnologies() {
        return technologies;
    }
    public void setTechnologies(List<Technology> technologies) {
        this.technologies = technologies;
    }
    public List<Db> getDbs() {
        return dbs;
    }
    public void setDbs(List<Db> dbs) {
        this.dbs = dbs;
    }
}
