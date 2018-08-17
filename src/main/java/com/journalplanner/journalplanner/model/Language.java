package com.journalplanner.journalplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "language")
public class Language {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "languages")
    @JsonIgnoreProperties({"languages","frameworks"})
    private Set<Resource> resources = new HashSet<>();

    @ManyToMany(mappedBy = "frameworks")
    @JsonIgnoreProperties({"languages","frameworks"})
    private Set<Project> projects = new HashSet<>();

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
    public Set<Resource> getResources() {
        return resources;
    }
    public void setResources(Set<Resource> resources) {
        this.resources = resources;
    }
    public Set<Project> getProjects() {
        return projects;
    }
    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }
}
