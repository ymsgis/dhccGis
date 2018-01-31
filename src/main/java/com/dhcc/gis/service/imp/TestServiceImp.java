package com.dhcc.gis.service.imp;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhcc.gis.entity.TestInfo;
import com.dhcc.gis.service.ITestService;
import com.mars.world.ssh.core.dao.IBaseDao;
import com.mars.world.ssh.core.service.BaseService;

public class TestServiceImp  extends  BaseService<TestInfo, String> implements ITestService {

	//@Autowired
	//private IAlertCategoryDao iAlertCategoryDao;
	
	@Override
	protected IBaseDao<TestInfo, String> getBaseDAO() {
		
		return null;
	}

}
