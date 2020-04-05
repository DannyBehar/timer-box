import React, {Component} from 'react'
import './App.css'
import Form from './Form'
import Table from './Table'
import SoundAlertOption from './SoundAlertOption'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Howl} from 'howler';


const numberTokens = {'one':'1','two':'2','three':'3','four':'4','five':'5','six':'6','seven':'7','eight':'8','nine':'9','ten':'10'}
const addTokens = ['add','and','plus']
const hourTokens = ['h','hr','hours','hour']
const minuteTokens = ['m','min','minute','minutes','mn']
const secondTokens = ['s','sc','secs','sec','second','seconds']

/*1 hour and 25 min*/
const isNumber = number => {
	return (number.match(/\d+/g)) || numberTokens[number] != null
}

const getTimeInSeconds = time => {
		let curNumber = ''
		let timeInSeconds = 0
		const words = time.split(" ")
		for(let word of words){
			if(isNumber(word)){
				let wordNumber = numberTokens[word]
				if(wordNumber != null) {
					curNumber = wordNumber
					continue
				}	
				curNumber = word
				continue
				
			}
			if(addTokens.includes(word)) continue

			if(hourTokens.includes(word)){
				timeInSeconds += curNumber * 60 * 60
				curNumber = ''
				continue
			}
			if(minuteTokens.includes(word)){
				timeInSeconds += parseInt(curNumber) * 60
				curNumber = ''
				continue
			}
			if(secondTokens.includes(word)){
				timeInSeconds += parseInt(curNumber)
				curNumber = ''
				continue
			}

		}
		return parseInt(timeInSeconds)
	}

class App extends Component {
	state = {
		tasks:[],
		timer: "Welcome",
		alert: null
	}
	audio = new Audio("/timer-box1.wav")
	secondsRemaining = null;
	timerHandler = null;
	addTask = task => {
		this.setState({tasks: [...this.state.tasks,task]})
	}

	setAlarm = fileName => {
		this.setState({alert: fileName})
	}

	removeTask = index => {
		const {tasks} = this.state

		this.setState({
			tasks: tasks.filter((task, i) => {
				return i !== index
			})
		})
	}

	startClock = time => {
		const timeInSeconds = getTimeInSeconds(time)
		//this.setState({timer: timeInSeconds})
		this.secondsRemaining = timeInSeconds
		this.timerHandler = setInterval(this.tick, 1000)
	}

	tick  = () => {
		//show hours
		let tempSeconds = this.secondsRemaining
		let timeRemainingText = ''
		if(tempSeconds > 3600){
			const hours = Math.floor(tempSeconds / 3600)
			tempSeconds = tempSeconds - (hours * 3600)
			timeRemainingText+= ' '+hours + ( (hours > 1) ?  ' hours' : 'hour')
			//const minutes = Math.floor((this.secondsRemaining - (hours * 3600)) / 60)
			//const seconds = Math.floor()
		}
		//show minutes
		if(tempSeconds > 60){
			const minutes = Math.floor(tempSeconds / 60)
			tempSeconds = tempSeconds - (minutes * 60)
			timeRemainingText+= ' '+ minutes + ((minutes > 1) ?  ' minutes' : ' minute')
		}
		//show seconds
		if(tempSeconds < 60){
			timeRemainingText+= ' '+ tempSeconds + ((tempSeconds > 1) ?  ' seconds...' : ' second...')
		}
		if(this.secondsRemaining === 0){
			timeRemainingText = 'Times Up!'
			let alertSound = new Howl({
				src: [this.state.alert]
			})
			alertSound.play()
			clearInterval(this.timerHandler)
		}
		this.setState({timer: timeRemainingText})
		this.secondsRemaining--;
	}

	render(){
		const{ tasks } = this.state;
		return (
			<div className="App">
				<SoundAlertOption setAlarm={this.setAlarm} />
				<Grid container direction="column" justify="center" alignItems="center">
					<Typography component="h3" variant="h3">{this.state.timer}</Typography>	
					<Form class="center-item" addTask={this.addTask} />
					<Table startClock={this.startClock} taskData={tasks} removeTask={this.removeTask} />
				</Grid>
			</div>
			)
	}
}

export default App