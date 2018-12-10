// import React from 'react';
// import axios from 'axios';
// import { saveToken, decodeToken } from '../../lib/auth';
// import { handleChange } from '../../lib/common';
//
// class EditUser extends React.Component {
//   constructor(props){
//     super(props);
//     this.state={};
//     this.handleChange = handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   componentDidMount(){
//     axios.get(`/api/users/${decodeToken().sub}`)
//       .then(result => {
//         this.setState({ user: result.data });
//         console.log('this is this.state', this.state);
//       });
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     console.log('this is this.state', this.state);
//     axios.put(`/api/users/${decodeToken().sub}`, this.state)
//       .then(result => {
//         saveToken(result.data.token);
//         console.log('updates user', result);
//       })
//       .then(() => this.props.history.push(`/users/${decodeToken().sub}`));
//   }
//
//   render(){
//     return(
//       <form className="register" onSubmit={this.handleSubmit}>
//         <div className="field">
//           <input
//             className="input"
//             name="name"
//             placeholder="Name"
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             className="input"
//             name="profilePicture"
//             placeholder="Profile Picture"
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             className="input"
//             name="username"
//             placeholder="Username"
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             className="input"
//             name="email"
//             placeholder="Email"
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             className="input"
//             name="bio"
//             placeholder="Bio"
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             className="input"
//             name="location.lat"
//             placeholder="Your Latitude"
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             className="input"
//             name="location.lng"
//             placeholder="Your Longitude"
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             type="password"
//             className="input"
//             name="password"
//             placeholder="Password"
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             type="text"
//             className="input"
//             name="city"
//             placeholder="City"
//             onChange={this.handleChange}
//           />
//         </div>
//         <button className="button is-primary">Edit</button>
//       </form>
//     );
//   }
// }
//
// export default EditUser;
