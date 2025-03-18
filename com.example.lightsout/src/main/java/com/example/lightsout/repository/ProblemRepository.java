package com.example.lightsout.repository;

import com.example.lightsout.model.Problem;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProblemRepository implements PanacheRepository<Problem> {
}