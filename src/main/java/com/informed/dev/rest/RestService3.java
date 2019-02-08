package com.informed.dev.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/msg3")
public class RestService3 {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getMessage() {
        return "My message3\n";
    }
}
