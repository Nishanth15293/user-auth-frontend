import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import * as UsersAPI from '../utils/UsersAPI';

const data = UsersAPI.getUsers()

const makeDefaultState = () => ({
  sorted: [],
  page: 0,
  pageSize: 25,
  expanded: {},
  resized: [],
  filtered: []
});

class Users extends Component {
    constructor() {
    super();
    this.state = makeDefaultState();
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState(makeDefaultState());
  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.resetState}>Reset State</button>
        </div>
        <pre>
          <code>
            <strong>this.state ===</strong>{" "}
            {JSON.stringify(this.state, null, 2)}
          </code>
        </pre>
        <ReactTable
          data={data}
          columns={[
                    {
                    Header: "Name",
                    accessor: "name"
                    },
                    {
                    Header: "Email",
                    accessor: "email"
                    },
                    {
                    Header: "Phone",
                    accessor: "phone"
                    },
                    {
                    Header: "Image",
                    accessor: "name"
                    }
                ]}
          pivotBy={["lastName"]}
          filterable
          defaultPageSize={25}
          className="-striped -highlight"
          // Controlled props
          sorted={this.state.sorted}
          page={this.state.page}
          pageSize={this.state.pageSize}
          expanded={this.state.expanded}
          resized={this.state.resized}
          filtered={this.state.filtered}
          // Callbacks
          onSortedChange={sorted => this.setState({ sorted })}
          onPageChange={page => this.setState({ page })}
          onPageSizeChange={(pageSize, page) =>
            this.setState({ page, pageSize })}
          onExpandedChange={expanded => this.setState({ expanded })}
          onResizedChange={resized => this.setState({ resized })}
          onFilteredChange={filtered => this.setState({ filtered })}
        />
        <br />
      </div>
    );
  }
 
}

export default Users