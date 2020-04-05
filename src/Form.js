import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './Task.css'

class Form extends Component{
	handleEnterKey = (event) => {
		if(event.keyCode == 13){
			this.onFormSubmit()
		}
	}

	  componentDidMount(){
		this.nameInputRef = React.createRef();
	  }

	

	componentWillMount(){
		console.log("pressing enter")
		document.addEventListener("keydown", this.handleEnterKey, false)	
	}

	

	componentWillUnmount(){
		document.removeEventListener("keydown", this.handleEnterKey, false)
	}

	initialState = {
		name: '',
		timeEst: ''
	}

	state = this.initialState

	handleChange = event => {
		const { name, value } = event.target

		this.setState({
			[name] : value
		})
	}

	onFormSubmit = (event) => {
		if(this.state.name && this.state.timeEst){
			this.props.addTask(this.state)
			this.setState(this.initialState)
			this.nameInputRef.current.focus()
		}
	}

	render(){
		const {name,timeEst} = this.state

		return(
				<form>
					<TextField autoFocus inputRef={this.nameInputRef} name='name' value={name} onChange={this.handleChange} label='Task Name'></TextField>
					<TextField name='timeEst' value={timeEst} onChange={this.handleChange} id='standard-basic' label='Est. Time'></TextField>
					<Fab onClick={this.onFormSubmit} color="secondary" aria-label="add">
  						<AddIcon />
					</Fab>
				</form>
			
		)
	}	
	
}

export default Form
