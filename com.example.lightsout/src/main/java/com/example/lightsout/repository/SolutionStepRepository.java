package com.example.lightsout.repository;

import com.example.lightsout.model.SolutionStep;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SolutionStepRepository implements PanacheRepository<SolutionStep> {
}
