package com.example.xpsearchliu;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.name.Named;

@Singleton
public class DbConnectionManager {
	private String driverClass;
	private String url;
	private String user;
	private String password;
	private List<Connection> connections;
	
	@Inject
	public DbConnectionManager(@Named("db.driver_class") String driverClass,
			@Named("db.url") String url,
			@Named("db.username") String user,
			@Named("db.password") String password){
		this.driverClass = driverClass;
		this.url = url;
		this.user = user;
		this.password = password;
		connections = new ArrayList<Connection>();
		int size = 5;
		do{
			connections.add(createNewConnection());
			size--;
		}while(size!=0);
	}
	
	public Connection createNewConnection(){
		try{
			Class.forName(driverClass);
			return DriverManager.getConnection(url, user, password);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	public Connection getConnection(){
		Connection connection = connections.get((int)(Math.random()*5));
		try {
			if(connection.isClosed()){
				connections.remove(connection);
				connection = getConnection();
				connections.add(connection);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return connection;
	}
}
