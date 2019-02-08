package com.informed.dev;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HelloWorldServlet
 * 
 * For simpler approach (no need to install Tomcat etc) instead see EmbeddedJettyMain
 * 
 * To run: 
 *  - Project: RMB> Run as> Run on server; Pivotal v3 / Tomcat (built in to Eclipse/Spring)
 * Browse to  http://localhost:8082/Week2DemoWebapp/hello
 * 
 * Likewise (on Tomcat) browse -> to see :
 *  http://localhost:8082/Week2DemoWebapp/index3.html  ->  src/main/webapp/index3.html
 *  http://localhost:8082/Week2DemoWebapp/static/index5.html  ->  src/main/webapp/static/index5.html
 * IF we have  `webapp`  configured (as Eclipse / RunAsTC has set) in file: 
 *   Week2DemoWebapp/.settings/org.eclipse.wst.common.component   This element:
 *   <wb-resource deploy-path="/" source-path="/src/main/webapp"/>
 *   

TODO cfg Maven for Java10, and UBU VM's version of JUnit
TODO remove **MB comments /w

 */
@WebServlet("/hello")
public class SimpleServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SimpleServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("service at: ").append(request.getContextPath()).append("<br>");
		doGet(request, response);
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html>");
        out.println("<head><title>Hello!!!</title></head>");
        out.println("<body>" +
                    "<h1>Hello again :-)</h1>" +
                    "This page was generated at " + new Date() +
                    "</body></html>");
        out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html");
		response.getWriter().append("<b>doPost</b> at: ").append(request.getRequestURI());
	}

}