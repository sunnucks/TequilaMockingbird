package com.informed.dev;


import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;

import com.informed.dev.rest.RestService;

/**
 * @author mikeburton
 *
 * Run: 
 *  For JettyServlet,  Browse to  http://localhost:7070/example
 *  For webapp in index.html, *.js etc,  Browse to just  http://localhost:7070
 */
public class EmbeddedJettyMain {

	public static void main(String[] args) throws Exception {

		Server server = new Server(7070);

		ResourceHandler resourceHandler = new ResourceHandler();
		resourceHandler.setDirectoriesListed(false);
		resourceHandler.setResourceBase("src/main/webapp/static");
		// ^So as to run the index.html there (= webapp) by browsing just  http://localhost:7070

		ServletContextHandler exampleHandler = new ServletContextHandler(server, "/example");
		exampleHandler.addServlet(JettyServlet.class, "/");
		
		ServletContextHandler restHandler = new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
		restHandler.setContextPath("/");
		ServletHolder serHol = restHandler.addServlet(ServletContainer.class, "/rest/*");
		serHol.setInitOrder(1);
		// Tell Jetty where to look for REST service classes:
		serHol.setInitParameter("jersey.config.server.provider.packages", 
				"com.informed.dev.rest");
		
		server.setHandler(new HandlerList( new Handler[] { exampleHandler, resourceHandler, restHandler }) );
		// ^ resourceHandler needs to be BEFORE restHandler

		server.start();
		server.join();

	}

}
