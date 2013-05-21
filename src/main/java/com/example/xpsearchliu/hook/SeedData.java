package com.example.xpsearchliu.hook;

import java.sql.SQLException;

import com.britesnow.snow.web.hook.AppPhase;
import com.britesnow.snow.web.hook.annotation.WebApplicationHook;
import com.example.xpsearchliu.dao.UserDao;
import com.google.inject.Singleton;

@Singleton
public class SeedData {
	@WebApplicationHook(phase = AppPhase.INIT)
    public void seedData(UserDao userDao) throws SQLException {
		 userDao.initData();
	}
	
}