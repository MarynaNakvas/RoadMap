import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roadMapActions, roadMapSelectors } from 'core/roadmap';

const RoadMapApp = () => {
  const dataList = useSelector(roadMapSelectors.getDataList);
  const isDataListFetching = useSelector(
    roadMapSelectors.getIsDataListFetched,
  );

  const dispatch = useDispatch();

  const data = useCallback(() => {
    dispatch(roadMapActions.fetchDataList());
  }, [dispatch]);

  useEffect(() => {
    data();
  }, []);

  console.log('dataList', dataList);
  console.log('isDataListFetching', isDataListFetching);

  return <button onClick={data}>My RoadMap Application</button>;
};

export default RoadMapApp;
