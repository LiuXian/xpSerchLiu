package com.example.xpsearchliu.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Map;

import com.example.xpsearchliu.DbConnectionManager;
import com.example.xpsearchliu.util.DataReader;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class CommentDao {

	@Inject
	private DbConnectionManager dbConnectionManager;
	
	public void init() throws SQLException{
		StringBuffer sql = new StringBuffer();
		sql.append("insert into xpsearchliu_schema.").append("comment")
		.append(" (id,postid,text,creationdate,userid)")
		.append(" values ");
		for(Map m:DataReader.readXML("Comments.xml")){
			sql.append("(").append(m.get("id")).append(",")
				.append(m.get("postid")).append(",")
				.append(getString(m.get("text"))).append(",")
				.append(getDateString(m.get("creationdate"))).append(",")
				.append(m.get("userid")).append("),");
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
