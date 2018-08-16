package com.journalplanner.journalplanner.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

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

    @Column(name = "language", nullable = true)
    private ArrayList<Language> language;

    @Column(name = "framework", nullable = true)
    private ArrayList<Language> framework;

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
    public ArrayList<Language> getLanguage() {
        return language;
    }
    public void setLanguage(ArrayList<Language> language) {
        this.language = language;
    }
    public ArrayList<Language> getFramework() {
        return framework;
    }
    public void setFramework(ArrayList<Language> framework) {
        this.framework = framework;
    }
}
