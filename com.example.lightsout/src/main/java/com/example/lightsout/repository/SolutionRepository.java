package com.example.lightsout.repository;

import com.example.lightsout.model.Solution;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SolutionRepository implements PanacheRepository<Solution> {
}
