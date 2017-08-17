import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import "react-table/react-table.css";
import * as UsersAPI from '../utils/UsersAPI';
import * as fetchUtil from '../utils/fetchUtil';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    height                : 'auto',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
const Styles = {
  label : {
    fontSize: '18px',
    paddingRight: '20px'
  },
  role : {
    paddingRight: '10px',
    marginRight: '10px',
    backgroundColor: 'red'
  },
  delete: {
    marginLeft: '10px'
  }
};
// const data = UsersAPI.getUsers()

class UsersList extends Component {
 constructor() {
    super();
    const current_user = localStorage.current_user ? JSON.parse(localStorage.current_user) : {};
    this.state = {
      data: [],
      pages: null,
      loading: true,
      modalIsOpen: false,
      name: null,
      email: null,
      phone: null,
      role: null,
      id: null,
      disabled: true,
      current_user: current_user
    };
    this.fetchData = this.fetchData.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.roleChange = this.roleChange.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    
  }

  update() {
    let user = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      role: this.state.role,
      id: this.state.id
    }
    var self = this;
    UsersAPI.update(user).then(function(res){
      self.fetchData(self.state);
      self.closeModal();
    });
  }

  delete() {
    let id = this.state.id;
    var self = this;
    UsersAPI.remove(id).then(function(res){
      self.fetchData(self.state);
      self.closeModal();
    });
  }

  nameChange(e) {
    this.setState({name: e.target.value});
  }
  emailChange(e) {
    this.setState({email: e.target.value});
  }
  phoneChange(e) {
    this.setState({phone: e.target.value});
  }
  roleChange(e) {
    this.setState({role: e.target.value});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  requestData(pageSize, page, sorted, filtered) {
      return UsersAPI.getUsers(pageSize, page, sorted, filtered).then(res => {
          return {
              rows: res.docs,
              pages: res.pages
          }
      })
  }
  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    this.requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }
  render() {
    const { data, pages, loading } = this.state;

    return (
      <div>
        <h3 className="table-title">Users</h3>
        <ReactTable

          getTrProps = {(state,rowInfo)=> {
            return {
              onClick: () => {
                const { current_user } = this.state;
                
                var disable = true;
                if(current_user._id == rowInfo.row._id){
                  disable = false;
                }
                if(current_user.role == 'admin' && rowInfo.row.role == 'user'){
                  disable = false;
                }
                if(current_user.role == 'superadmin'){
                  disable = false;
                }
                this.setState({
                  modalIsOpen: true,
                  email: rowInfo.row.email,
                  name: rowInfo.row.name,
                  phone: rowInfo.row.phone,
                  role: rowInfo.row.role,
                  id: rowInfo.row._id,
                  disabled: disable
                });

              }
            }
          }}
          columns={[
            {
                Header: "Avatar",
              accessor: "avatarURL"
            },
            {
              Header: "Name",
              accessor: "name"
            },
            {
              Header: "Email",
              accessor: 'email'
            },
            {
              Header: "Phone",
              accessor: "phone"
            },
            {
                Header: "Role",
              accessor: "role"
            },
            {
                Header: "Id",
              accessor: "_id",
              show: false
            }
          ]}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData} // Request new data when things change
          filterable
          defaultPageSize={10}
          className="-striped -highlight grid"
        />
        <br />
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          onRequestClose={this.closeModal}
          contentLabel="User Modal"
        > 
          <div className='container'>
          <div className='row'>
            <a className="pull-right" onClick={this.closeModal}><span className="glyphicon glyphicon-remove cursor-btn"></span></a>
          </div>            
            <div className='row'>
              <div className='col-md-4 col-sm-4'>
                <img className='img-rounded' src="http://via.placeholder.com/150x150" alt="test"/>
              </div>
              <div className='col-md-8 col-sm-8'>
                <div className='row form-group'>
                  <label style = {Styles.label}>Name:</label>
                  <input type="text" className='form-control' disabled={this.state.disabled} value={this.state.name} onChange = {this.nameChange} />
                </div>
                <div className='row form-group'>
                  <label style = {Styles.label}>Email:</label>
                  <input type="text" className='form-control' disabled={this.state.disabled} value={this.state.email} onChange = {this.emailChange} />
                </div>
                <div className='row form-group'>
                  <label style = {Styles.label}>Phone:</label>
                  <input type="text" className='form-control' disabled={this.state.disabled} value={this.state.phone} onChange = {this.phoneChange} />
                </div>
                <div className='row form-group'>
                  <label style = {Styles.label}>Roles:</label>
                  {/* <input type="text" className='form-control' disabled={this.state.disabled} value={this.state.role} onChange = {this.roleChange} /> */}
                  <select value={this.state.role} disabled={this.state.disabled} onChange = {this.roleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="row form-group">
                  <button className='btn btn-primary pull-right' disabled={this.state.disabled} onClick={this.update}>Update User</button>
                  <button className='btn btn-danger pull-left' disabled={this.state.disabled} onClick={this.delete}>Delete User</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default UsersList