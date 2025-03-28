package com.example.lightsout.api;

import java.util.List;

import com.example.lightsout.model.Problem;
import com.example.lightsout.repository.ProblemRepository;

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

@Path("/problems")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class ProblemResource {

    @Inject
    ProblemRepository problemRepository;

    @GET
    public List<Problem> getAllProblems() {
        return problemRepository.listAll();
    }

    @GET
    @Path("/creator/{username}")
    public List<Problem> getProblemsByCreator(@PathParam("username") String username) {
        return problemRepository.find("creator.username", username).list();
    }

    @GET
    @Path("/{id}")
    public Problem getProblemById(@PathParam("id") Long id) {
        return problemRepository.findById(id);
    }

    @POST
    @Transactional
    public Response createProblem(Problem problem) {
        problemRepository.persist(problem);
        return Response.status(Response.Status.CREATED).entity(problem).build();
    }
}
