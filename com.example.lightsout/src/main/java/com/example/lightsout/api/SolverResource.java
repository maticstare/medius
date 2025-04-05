package com.example.lightsout.api;

import java.util.Arrays;
import java.util.stream.Collectors;

import com.example.lightsout.solver.Solver;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/solver")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SolverResource {

    @POST
    public Response solveBoard(SolverRequest request) {
        try {
            Solver solver = new Solver(request.board);
            boolean result = solver.solve();
            int[] solutionArray = solver.getSolution();

            return Response.ok(new SolverResponse(
                result,
                Arrays.stream(solutionArray).boxed().collect(Collectors.toList())
            )).build();

        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new SolverResponse(false, null))
                    .build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
