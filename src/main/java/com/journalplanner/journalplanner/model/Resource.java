package com.journalplanner.journalplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.core.annotation.Order;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="resource")
public class Resource {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="url", nullable = false)
    private String url;

    @Column(name="memo", nullable = true)
    private String memo;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "resource_language", joinColumns = { @JoinColumn(name = "resource_id") }, inverseJoinColumns = { @JoinColumn(name = "language_id") })
    @Column(name = "language", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    @OrderBy("id")
    private Set<Language> languages = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "resource_framework", joinColumns = { @JoinColumn(name = "resource_id") }, inverseJoinColumns = { @JoinColumn(name = "framework_id") })
    @Column(name = "framework", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    @OrderBy("id")
    private Set<Framework> frameworks = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "resource_technology", joinColumns = { @JoinColumn(name = "resource_id") }, inverseJoinColumns = { @JoinColumn(name = "technology_id") })
    @Column(name = "technology", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    @OrderBy("id")
    private Set<Technology> technologies = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "resource_database", joinColumns = { @JoinColumn(name = "resource_id") }, inverseJoinColumns = { @JoinColumn(name = "database_id") })
    @Column(name = "db", nullable = true)
    @JsonIgnoreProperties({"projects", "resources"})
    @OrderBy("id")
    private Set<Db> dbs = new HashSet<>();

    public Integer getId(){
        return id;
    }
    public void setId(Integer id){ this.id=id;}
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    public String getMemo() {
        return memo;
    }
    public void setMemo(String memo) {
        this.memo = memo;
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
    public Set<Technology> getTechnologies() {
        return technologies;
    }
    public void setTechnologies(Set<Technology> technologies) {
        this.technologies = technologies;
    }
    public Set<Db> getDbs() {
        return dbs;
    }
    public void setDbs(Set<Db> dbs) {
        this.dbs = dbs;
    }
}