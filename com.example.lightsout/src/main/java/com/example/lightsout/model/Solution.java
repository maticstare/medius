package com.example.lightsout.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Solution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player solver;

    @Column(name = "solution", nullable = false, columnDefinition = "TEXT")
    private String solution;

    // Getters
    public Long getId() { return id; }
    public Problem getProblem() { return problem; }
    public Player getSolver() { return solver; }
    public String getSolution() { return solution; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setProblem(Problem problem) { this.problem = problem; }
    public void setSolver(Player solver) { this.solver = solver; }
    public void setSolution(String solution) { this.solution = solution; }
}
