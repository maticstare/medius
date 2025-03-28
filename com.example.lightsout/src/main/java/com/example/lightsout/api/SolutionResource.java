package com.example.lightsout.api;

import java.util.List;

import com.example.lightsout.model.Solution;
import com.example.lightsout.repository.SolutionRepository;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/solutions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class SolutionResource {

    @Inject
    SolutionRepository solutionRepository;

    @GET
    public List<Solution> getAllSolutions() {
        return solutionRepository.listAll();
    }

    @GET
    @Path("/solver/{username}")
    public List<Solution> getSolutionsBySolver(@PathParam("username") String username) {
        return solutionRepository.find("solver.username", username).list();
    }

    @GET
    @Path("/problem/{id}")
    public List<Solution> getSolutionsByProblem(@PathParam("id") Long id) {
        return solutionRepository.find("problem.id", id).list();
    }

    @POST
    @Transactional
    public Response createSolution(Solution solution) {
        solutionRepository.persist(solution);
        return Response.status(Response.Status.CREATED).entity(solution).build();
    }
}
