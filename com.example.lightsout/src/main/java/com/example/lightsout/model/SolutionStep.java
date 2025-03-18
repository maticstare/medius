package com.example.lightsout.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "solution_step")
public class SolutionStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "solution_id", nullable = false)
    private Solution solution;

    @Column(name = "move_x", nullable = false)
    private int moveX;

    @Column(name = "move_y", nullable = false)
    private int moveY;

    @Column(name = "step_order", nullable = false)
    private int stepOrder;

    // Getters
    public Long getId() { return id; }
    public Solution getSolution() { return solution; }
    public int getMoveX() { return moveX; }
    public int getMoveY() { return moveY; }
    public int getStepOrder() { return stepOrder; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setSolution(Solution solution) { this.solution = solution; }
    public void setMoveX(int moveX) { this.moveX = moveX; }
    public void setMoveY(int moveY) { this.moveY = moveY; }
    public void setStepOrder(int stepOrder) { this.stepOrder = stepOrder; }
}
