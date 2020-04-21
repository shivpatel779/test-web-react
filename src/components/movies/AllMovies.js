import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {appConstants} from '../../constants/constants'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


 class AllMovies extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			movies: [],
			currentMovie: {}
		}

	}


	async componentDidMount(){
	  let response  = await axios.get(`${appConstants.WEB_SERVICE_URL}/api/v1/movies`)
		this.setState({movies: response.data})
	}
	onOpenModal = (movie) => {
    this.setState({ open: true,currentMovie: movie });
  };
 
  onCloseModal = () => {
    this.setState({ open: false,currentMovie: {} });
  };

  remove = async(id) => {
  	let response  = await axios.delete(`${appConstants.WEB_SERVICE_URL}/api/v1/movies/${id}`)
    if(response.status == 200){
    	let movies  = this.state.movies.filter((movie) => movie.id !== id)
    	this.setState({movies: movies})
    }
  }
 
	render() {
		const {movies, currentMovie} = this.state
	  return (
	    <div className="container">
	    	<Link to={`/movies/new`} className="btn btn-primary"> Create Movies </Link>&nbsp;
	    	<Link to={`/seat-available`} className="btn btn-primary">Best Seat Available</Link>
	    	
	    	<div className="row pt-20">
	    	<div className="searchable-container row">
	    		{movies.map((movie) =>
					<div  className="items col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
					 <div className="info-block block-info clearfix">
					    <div className="square-box pull-left">
					        <span className="glyphicon glyphicon-user glyphicon-lg"></span>
					    </div>
					    <h5>Title: {movie.title}</h5>
					    <h4>Summary: {movie.summary}</h4>
					    <p>Year: {movie.year}</p>
					    <span>Genre: {movie.gemre}</span>
					    <span>IMDB: {movie.imdb_link}</span>
					    <br/>
					    <a href="javascript:void(0)" className="btn btn-danger" onClick={() => this.remove(movie.id)}>Remove</a>
					    <a href="javascript:void(0)" className="btn btn-dafault" onClick={() => this.onOpenModal(movie)}>Show</a>

					
					  </div>
					</div>)}
				</div>
				</div>
				 <Modal open={this.state.open} onClose={this.onCloseModal} center>
				 	  <h5>Title: {currentMovie.title}</h5>
					    <h4>Summary: {currentMovie.summary}</h4>
					    <p>Year: {currentMovie.year}</p>
					    <span>Genre: {currentMovie.gemre}</span>
					    <span>IMDB: {currentMovie.imdb_link}</span><br/>
              <Link to={`/movies/${this.state.currentMovie.id}/edit`}>Edit</Link>
        </Modal>
	    </div>
	  );
	}
}
export default AllMovies;