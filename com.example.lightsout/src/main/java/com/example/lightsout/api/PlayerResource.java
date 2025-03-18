package com.example.lightsout.api;

import java.util.List;

import com.example.lightsout.model.Player;
import com.example.lightsout.repository.PlayerRepository;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/players")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PlayerResource {

    @Inject
    PlayerRepository playerRepository;

    @GET
    public List<Player> getAllPlayers() {
        return playerRepository.listAll();
    }

    

}
