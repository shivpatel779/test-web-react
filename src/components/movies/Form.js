import React from 'react';
import axios from 'axios'
import {appConstants} from '../../constants/constants'
import  toastr from "toastr";
let obj = {}
toastr.options.newestOnTop = true;
 class Form extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			formData: {},
			id: props.match.params.id,
			movie: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleChange = (event) =>{
	  obj[event.target.name] = event.target.value
	  this.setState({formData: obj})
	}

	async componentDidMount(){
		if(this.state.id){
			let response = await axios.get(`${appConstants.WEB_SERVICE_URL}/api/v1/movies/${this.state.id}`)
			this.setState({movie: response.data})
		}
	}

	handleSubmit(event){
		event.preventDefault()
		if(this.state.id)
			this.updateData()
		else
			this.saveData()
	}

	saveData = () => {
		axios.post(`${appConstants.WEB_SERVICE_URL}/api/v1/movies`,this.state.formData).then((result) => {
		  toastr.success('successful created')
			setTimeout(function(){
				this.props.history.push('/movies')
			}.bind(this),1000)

		}).catch((error) => {

			 toastr.error(error.response.data)

		})

	}

	updateData = () => {
		axios.put(`${appConstants.WEB_SERVICE_URL}/api/v1/movies/${this.state.id}`,this.state.formData).then((result) => {
			toastr.success('successful updated')	
			setTimeout(function(){
				this.props.history.push('/movies')
			}.bind(this),1000)
		}).catch((error) => {
			toastr.error(error.response.data)	
		})

	}
	render() {
		const {movie} = this.state
	  return (
			<main className="login-form">
				<div className="cotainer">
					<div className="row justify-content-center">
					 	<div className="col-md-8">
					   <div className="card">
					     <div className="card-header">New Movies </div>
					      <div className="card-body">
					        <form action="" method="post" onSubmit={(event) => this.handleSubmit(event)}>
			              <div className="form-group row">
											<label for="email_address" className="col-md-4 col-form-label text-md-right">Title</label>
											<div className="col-md-6">
											  <input type="text" id="email_address" onChange={this.handleChange} defaultValue={movie.title} className="form-control" name="title" required autofocus/>
											</div>
			              </div>
			              <div className="form-group row">
											<label for="email_address" className="col-md-4 col-form-label text-md-right">Summary</label>
											<div className="col-md-6">
											  <input type="text" id="email_address" onChange={this.handleChange} defaultValue={movie.summary} className="form-control" name="summary" required autofocus/>
											</div>
			              </div>
			              <div className="form-group row">
											<label for="email_address" className="col-md-4 col-form-label text-md-right">Year</label>
											<div className="col-md-6">
											  <input type="text" id="email_address" onChange={this.handleChange} defaultValue={movie.year} className="form-control" name="year" required autofocus/>
											</div>
			              </div>
			              <div className="form-group row">
											<label for="email_address" className="col-md-4 col-form-label text-md-right">Genre</label>
											<div className="col-md-6">
											  <input type="text" id="email_address" onChange={this.handleChange} defaultValue={movie.genre} className="form-control" name="genre" required autofocus/>
											</div>
			              </div>

			              <div className="form-group row">
											<label for="password" className="col-md-4 col-form-label text-md-right">Imdb link</label>
											<div className="col-md-6">
											  <input type="text" id="password" onChange={this.handleChange} defaultValue={movie.imdb_link} className="form-control" name="imdb_link" required/>
											</div>
			              </div>

			              <div className="form-group row">
											<input type="submit" value ="create"/>
			              </div>
					       	</form>
					      </div>
					    </div>
					  </div>
					</div>
				</div>
			</main>
	  );
	}
}
export default Form;