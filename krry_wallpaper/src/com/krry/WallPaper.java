package com.krry;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WallPaper extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String url = request.getParameter("url");
		URL localURL = new URL(url);    
        URLConnection connection = localURL.openConnection();    
        HttpURLConnection httpURLConnection = (HttpURLConnection) connection;    
        httpURLConnection.setRequestProperty("Accept-Charset", "utf-8");    
        httpURLConnection.setRequestProperty("Content-Type","application/text");    
    
        InputStream inputStream = null;    
        InputStreamReader inputStreamReader = null;    
        BufferedReader reader = null;    
        StringBuffer resultBuffer = new StringBuffer();    
        String tempLine = null;       
    
        try {    
            inputStream = httpURLConnection.getInputStream();    
            inputStreamReader = new InputStreamReader(inputStream);    
            reader = new BufferedReader(inputStreamReader);    
    
            while ((tempLine = reader.readLine()) != null) {    
                resultBuffer.append(tempLine);    
            }    
    
        } finally {    
            if (reader != null) {    
                reader.close();    
            }    
            if (inputStreamReader != null) {    
                inputStreamReader.close();    
            }    
            if (inputStream != null) {    
                inputStream.close();    
            }    
    
        }
        //响应到ajax
        response.getWriter().println(resultBuffer.toString());   
		
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}

}
