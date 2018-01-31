package com.dhcc.gis.dao.imp;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.dhcc.gis.dao.ITestDao;
import com.dhcc.gis.entity.TestInfo;
import com.google.common.collect.Lists;
import com.mars.world.ssh.core.dao.BaseDao;
import com.mars.world.ssh.core.dao.EnumCriteria;
import com.mars.world.ssh.core.dao.SearchFilter;

@Repository
public class TestDaoImpl extends BaseDao<TestInfo, String>implements ITestDao {

	public List<TestInfo> getAlertCategoryByType(String type) {
		List<SearchFilter> searchFilters = Lists.newArrayList();
		// 条件一
		SearchFilter flt = new SearchFilter();
		flt.setEnumCriteria(EnumCriteria.EQ);
		flt.setFieldName("type");
		flt.setSearhValue(type);
		searchFilters.add(flt);
		return this.findAll(searchFilters);
	}

}
