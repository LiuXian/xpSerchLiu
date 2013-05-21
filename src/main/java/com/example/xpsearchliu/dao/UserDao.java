package com.example.xpsearchliu.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;

import com.example.xpsearchliu.DbConnectionManager;
import com.example.xpsearchliu.util.DataReader;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class UserDao {

	@Inject
	private DbConnectionManager dbConnectionManager;
	public void initData() throws SQLException{

		StringBuffer sql = new StringBuffer();
			sql.append("insert into xpsearchliu_schema.user")
			.append(" (id,reputation,creationdate,aboutme,displayname,lastaccessdate,")
			.append("websiteurl,location,views,upvotes,downvotes,emailhash)")
			.append(" values ");
			for(Map m:DataReader.readXML("Users.xml")){
				sql.append("(").append(m.get("id")).append(",")
					.append(m.get("reputation")).append(",")
					.append(getDateString(m.get("creationdate"))).append(",")
					.append(getString(m.get("aboutme"))).append(",")
					.append(getString(m.get("displayname"))).append(",")
					.append(getDateString(m.get("lastaccessdate"))).append(",")
					.append(getDateString(m.get("websiteurl"))).append(",")
					.append(getString(m.get("location"))).append(",")
					.append(m.get("views")).append(",")
					.append(m.get("upvotes")).append(",")
					.append(m.get("downvotes")).append(",")
					.append(getString(m.get("emailhash"))).append("),");
			}
		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.substring(0,sql.length()-1));
		statement.execute();
	}
	
	private String getDateString(Object src){
		if(src==null){
			return null;
		}else {
			return "'"+(String)src+"'";
			}
	}
	
	private String getString(Object src){
		if(src==null){
			return "''";
		}else {
			return "'"+(String)src+"'";
			}
	}
}
