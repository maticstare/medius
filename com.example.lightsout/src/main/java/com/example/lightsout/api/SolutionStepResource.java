package com.example.lightsout.api;

import java.util.List;

import com.example.lightsout.model.SolutionStep;
import com.example.lightsout.repository.SolutionStepRepository;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/solution_step")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SolutionStepResource {

    @Inject
    SolutionStepRepository solutionStepRepository;

    @GET
    public List<SolutionStep> getAllSolutionSteps() {
        return solutionStepRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public SolutionStep getSolutionStepById(@PathParam("id") Long id) {
        return solutionStepRepository.findById(id);
    }

    @POST
    public Response createSolutionStep(SolutionStep solutionStep) {
        solutionStepRepository.persist(solutionStep);
        return Response.status(Response.Status.CREATED).entity(solutionStep).build();
    }
}
