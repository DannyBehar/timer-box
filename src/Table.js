import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import './Task.css'

const useStyles = makeStyles(theme => ({
  root: {
	spacing: 2,
    width: '100%',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
  },
  progressFill: {
  	zIndex: '100',
  	backgroundColor: 'blue',
  },
  inline: {
    display: 'inline',
  },
}));



const Table = (props) => {
	const startClock = (time) => {
		props.startClock(time)
	}
	const removeTask = (index) => {
		props.removeTask(index)
	}
	const classes = useStyles();
	const rows = props.taskData.map((row,index) => {
		return (
			<Grid item xs={12} direction='column'>
				<Grow in={true}>
					<Card className={classes.root}>		
						<CardContent>
								<Grid container direction="row">
										<Checkbox
			        						value="secondary"
			        						color="secondary"
			        						inputProps={{ 'aria-label': 'secondary checkbox' }}
			      						/>
									<Grid item xs={8}>
										<Typography component="h6" variant="h6">{row.name}</Typography>
										<Typography variant="subtitle1" color="textSecondary">{row.timeEst}</Typography>
									</Grid>
									<Grid container xs={2} direction="column">
										<Button onClick={() =>startClock(row.timeEst)}>Start</Button>
										<IconButton onClick={ () => removeTask(index)}>
											<DeleteIcon fontSize={"small"} />
										</IconButton>
									</Grid>	
								</Grid>
						</CardContent>
					</Card>
				</Grow>
				</Grid>
			)
	})
	return(
		<Grid container className={classes.root} spacing={2} style={{maxHeight: '50', overflow: 'auto'}}>
			{rows}
		</Grid>
		

		)
}

export default Table