import PropTypes from 'prop-types';
import React from 'react';

import { Breadcrumbs } from 'linode-components';
import { Table } from 'linode-components';
import { LinkCell } from 'linode-components';


export default function EndpointIndex(props) {
  const { route } = props;
  const { crumbs, endpointIndex } = route;

  return (
    <div className="EndpointIndex">
      <div className="EndpointIndex-header">
        <div className="EndpointIndex-breadcrumbsContainer">
          <Breadcrumbs crumbs={crumbs} />
        </div>
        <h1>{endpointIndex.name}</h1>
        {!endpointIndex.description ? null : <p>{endpointIndex.description}</p>}
      </div>
      <div>
        {endpointIndex.groups.map(function (group) {
          return (
            <div className="EndpointIndex-group" id={group.label.toLowerCase()}>
              {group.label === '' ? null : <h3>{group.label}</h3>}
              <Table
                className="Table--secondary"
                columns={[
                  {
                    cellComponent: LinkCell,
                    textKey: 'path',
                    label: 'Endpoint',
                    headerClassName: 'EndpointColumn',
                    hrefFn: function (endpoint) {
                      return endpoint.routePath;
                    },
                  },
                  { label: 'Description', dataKey: 'description' },
                ]}
                data={group.endpoints}
                noDataMessage="No endpoints documented."
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

EndpointIndex.propTypes = {
  route: PropTypes.object,
};
