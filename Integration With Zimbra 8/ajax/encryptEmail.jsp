<%@ page buffer="8kb" autoFlush="true"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ page session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page import="asia.ecoit.security.Encrypt" %>
<%
	String bodyText = request.getParameter("bodyText");
    String key = request.getParameter("key");
	Encrypt e = new Encrypt();
	out.print(e.encrypt3Des(bodyText, key));

%>