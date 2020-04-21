import React from 'react';
import axios from 'axios'
import {appConstants} from '../constants/constants'
import  toastr from "toastr";
let obj = {}
toastr.options.newestOnTop = true;
 class SeatAvailable extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			formData: {},
			result: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleChange = (event) =>{
	  obj[event.target.name] = event.target.value
	  this.setState({formData: obj})
	}


	handleSubmit(event){
		event.preventDefault()
		let data = {
		"venue": {
				"layout": appConstants.LAYOUT
			},
		"seat_requested": parseInt(this.state.formData.seat_requested),
		"seats": appConstants.SEATS
		}
		axios.post(`${appConstants.WEB_SERVICE_URL}/api/v1/best_seat_available`,data).then((result) => {
			debugger
			this.setState({result: result.data.seat_available})
		}).catch((error) => {
			 toastr.error(error.response.data)
		})
	}
	render() {
		const {result} = this.state
	  return (
			<main className="login-form">
				<div className="cotainer">
					<div className="row justify-content-center">
					 	<div className="col-md-8">
					   <div className="card">
					     <div className="card-header">Check seat availablity </div>
					      <div className="card-body">
					        <form action="" method="post" onSubmit={(event) => this.handleSubmit(event)}>
			              <div className="form-group row">
											<label for="email_address" className="col-md-4 col-form-label text-md-right">No. of seat</label>
											<div className="col-md-6">
											  <input type="number" id="email_address" onChange={this.handleChange} className="form-control" name="seat_requested" required autofocus/>
											</div>
			              </div>
			         

			              <div className="form-group row">
											<input type="submit" className="btn btn-primary"  value ="Check"/>
			              </div>
					       	</form>
					       	<div className="answers">
					       		Seat Available <br/>
					       		{result.join(",")}

					       	</div>
					      </div>
					    </div>
					  </div>
					</div>
				</div>
			</main>
	  );
	}
}
export default SeatAvailable;