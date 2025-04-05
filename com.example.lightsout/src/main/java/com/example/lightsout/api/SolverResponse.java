package com.example.lightsout.api;

import java.util.List;

public class SolverResponse {
    public boolean solutionFound;
    public List<Integer> solution;

    public SolverResponse(boolean solutionFound, List<Integer> solution) {
        this.solutionFound = solutionFound;
        this.solution = solution;
    }
}
