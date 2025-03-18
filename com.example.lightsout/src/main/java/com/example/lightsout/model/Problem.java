package com.example.lightsout.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description; // Board representation

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private Player createdBy;

    // Getters
    public Long getId() { return id; }
    public String getDescription() { return description; }
    public Player getCreatedBy() { return createdBy; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setDescription(String description) { this.description = description; }
    public void setCreatedBy(Player createdBy) { this.createdBy = createdBy; }
}
