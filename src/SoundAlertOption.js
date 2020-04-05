import React from 'react'
import Radio from '@material-ui/core/Radio';
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeOffOutlinedIcon from '@material-ui/icons/VolumeOffOutlined'
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksOneOutlinedIcon from '@material-ui/icons/LooksOneOutlined';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import LooksTwoOutlinedIcon from '@material-ui/icons/LooksTwoOutlined';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks3OutlinedIcon from '@material-ui/icons/Looks3Outlined';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks4OutlinedIcon from '@material-ui/icons/Looks4Outlined';
import {Howl} from 'howler';

export default function SoundAlertOption(props){
	const [selectedValue, setSelectedValue] = React.useState('a');

	const soundOne = new Howl({
		src: ['timer-box1.wav']
	})

	const soundTwo = new Howl({
		src: ['timer-box2.wav']
	})

	const soundThree = new Howl({
		src: ['timer-box3.wav']
	})

	const soundFour = new Howl({
		src: ['timer-box4.wav']
	})

	const map = new Map()
	map.set('a' , '')
	map.set('b' , 'timer-box1.wav')
	map.set('c' , 'timer-box2.wav')
	map.set('d', 'timer-box3.wav')
	map.set('e' , 'timer-box4.wav')


	const handleChange = event => {
		setSelectedValue(event.target.value)
		props.setAlarm(map.get(event.target.value))
	}

	const playAlert = (event) => {
		const val = event.target.value
		if(val == 'b'){
			soundOne.play()
		} 
		if(val == 'c'){
			soundTwo.play()
		} 
		if(val === 'd'){
			soundThree.play()
		} 
		if(val === 'e'){
			 soundFour.play()
		}
	}

	const getIcon = (val,checked) => {
		if(checked){
			switch(val){
				case 'a':
					return (<VolumeOffIcon/>)
				case 'b':
					return (<LooksOneIcon/>)
				case 'c':
					return (<LooksTwoIcon/>)
				case 'd':
					return(<Looks3Icon/>)
				case 'e':
					return(<Looks4Icon/>)
			}
		}else{
			switch(val){
				case 'a':
					return (<VolumeOffOutlinedIcon/>)
				case 'b':
					return (<LooksOneOutlinedIcon/>)
				case 'c':
					return (<LooksTwoOutlinedIcon/>)
				case 'd':
					return(<Looks3OutlinedIcon/>)
				case 'e':
					return(<Looks4OutlinedIcon/>)
			}
		}
	}

	return (
		<div>
		{
		['a','b','c','d','e'].map(val => (

			<Radio checked={selectedValue === val}
					onChange={handleChange}
					value={val}
					name="sound-alert-option"
					checkedIcon={getIcon(val,true)}
					icon={getIcon(val,false)}
					onClick={playAlert}
			/>


			))
	}

		</div>
			

		)
}