package com.example.lightsout.api;

import java.util.List;

import com.example.lightsout.model.Player;
import com.example.lightsout.repository.PlayerRepository;

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

@Path("/players")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class PlayerResource {

    @Inject
    PlayerRepository playerRepository;

    @GET
    public List<Player> getAllPlayers() {
        return playerRepository.listAll();
    }

    @GET
    @Path("/{username}")
    public Player getPlayerByUsername(@PathParam("username") String username) {
        return playerRepository.find("username", username).firstResult();
    }

    @POST
    @Transactional
    public Response createPlayer(Player player) {
        playerRepository.persist(player);
        return Response.status(Response.Status.CREATED).entity(player).build();
    }
}