import React, { FC, useEffect, useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { StyledLoader } from '../../shared/styled-loader/styled-loader';
import { getDashboardUsersDataAction } from '../../actions/async';
import { dashboardUsersSelector } from '../../selectors';

type UsersDashboardCompPropTypes = {
  getDashboardUsers(): void;
};

const UsersDashboardComp: FC<UsersDashboardCompPropTypes> = ({ getDashboardUsers }) => {
  const dashboardUsers = useSelector(dashboardUsersSelector);

  const options = useMemo(() => {
    if (Object.keys(dashboardUsers).length) {
      return {
        title: {
          text: 'Users dashboard',
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        yAxis: {
          title: {
            text: 'Users count',
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: 'Months',
            data: Object.values(dashboardUsers),
          },
        ],
      };
    }
    return {};
  }, [dashboardUsers]);

  useEffect(() => {
    getDashboardUsers();
  }, [getDashboardUsers]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <StyledLoader open={!Object.keys(dashboardUsers).length} />
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  getDashboardUsers: () => dispatch(getDashboardUsersDataAction()),
});

export const UsersDashboard = connect(null, mapDispatch)(UsersDashboardComp);
