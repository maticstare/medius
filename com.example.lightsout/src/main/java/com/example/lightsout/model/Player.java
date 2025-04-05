package com.example.lightsout.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Player {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private String password;

    // Getters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public int getAge() { return age; }
    public String getPassword() { return password; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setAge(int age) { this.age = age; }
    public void setPassword(String password) { this.password = password; }
}
