package com.journalplanner.journalplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "projects_language", joinColumns = { @JoinColumn(name = "projects_id") }, inverseJoinColumns = { @JoinColumn(name = "language_id") })
    @Column(name = "language", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    private Set<Language> languages = new HashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "project_framework", joinColumns = { @JoinColumn(name = "project_id") }, inverseJoinColumns = { @JoinColumn(name = "framework_id") })
    @Column(name = "framework", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    private Set<Framework> frameworks = new HashSet<>();

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
    public Set<Language> getLanguages() {
        return languages;
    }
    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }
    public Set<Framework> getFrameworks() {
        return frameworks;
    }
    public void setFrameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
    }
}
