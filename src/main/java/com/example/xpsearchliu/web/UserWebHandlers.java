package com.example.xpsearchliu.web;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.example.xpsearchliu.DbConnectionManager;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class UserWebHandlers {

	@Inject
	private DbConnectionManager dbConnectionManager;
	@WebGet("/getUsers")
	public Map getUsers(@WebParam("userId")Long userId,@WebParam("level")Integer level) throws SQLException{
		if(userId==null){
			userId = 9L;
		}
		if(level==null){
			level = 2;
		}
//		List<Map> results = new ArrayList<Map>();
//		String sql = "select distinct c.userid as userid,u.displayname as name " +
//				"from xpsearchliu_schema.post p join xpsearchliu_schema.comment c " +
//				"on p.owneruserid = "+userId+" and c.postid = p.id join xpsearchliu_schema.user u on u.id = c.userid limit 10 offset 0";
//		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.toString());
//		ResultSet resultSet = statement.executeQuery();
//		while(resultSet.next()){
//			Map map = new HashMap();
//			map.put("id", resultSet.getString("userid"));
//			map.put("name", resultSet.getString("name"));
//			map.put("parentId",userId);
//			map.put("weight", 1);
//			map.put("children",getUsersSet(Long.parseLong(resultSet.getString("userid")), null));
//			results.add(map);
//      }
		
		Map m = new HashMap();
		Map user = getUser(userId);
		m.put("id", user.get("id"));
		m.put("name", user.get("name"));
		m.put("children", getUsersSet(userId,level));
		return m;
	}
	
	
	private List getUsersSet(Long userId,Integer level) throws SQLException{
		while(level>0){	
			level-=1;
			List<Map> results = new ArrayList<Map>();
			String sql = "select distinct c.userid as userid,u.displayname as name " +
					"from xpsearchliu_schema.post p join xpsearchliu_schema.comment c " +
					"on p.owneruserid = "+userId+" and c.postid = p.id join xpsearchliu_schema.user u on u.id = c.userid limit 10 offset 0";
			PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.toString());
			ResultSet resultSet = statement.executeQuery();
			while(resultSet.next()){
				Map map = new HashMap();
				map.put("id", resultSet.getString("userid"));
				map.put("name", resultSet.getString("name"));
				map.put("parentId",userId);
				map.put("weight", 1);
				map.put("children",getUsersSet(resultSet.getLong("userId"),level));
				results.add(map);
			}			
			resultSet.close();
			statement.close();
			return results;
		}
		return null;
	}
	private Map getUser(Long userId) throws SQLException{
		String sql = "select id,displayname from xpsearchliu_schema.user where id = "+userId;
		PreparedStatement statement = dbConnectionManager.getConnection().prepareStatement(sql.toString());
		ResultSet resultSet = statement.executeQuery();
		Map m = new HashMap();
		while(resultSet.next()){
			Map map = new HashMap();
			map.put("id", resultSet.getString("id"));
			map.put("name", resultSet.getString("displayname"));
			m = map;
			break;
		}
		resultSet.close();
		statement.close();
		return m;
	}
	
}
