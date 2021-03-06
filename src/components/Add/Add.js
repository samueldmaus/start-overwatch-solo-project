import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import ReactCardFlip from 'react-card-flip';
import {withStyles} from '@material-ui/core/styles'
import {Grid, Card, CardHeader, CardActionArea, CardMedia, TextField,
    RadioGroup, Radio, FormControlLabel, IconButton, NativeSelect, FormControl} from '@material-ui/core';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone'

const styles = theme => ({
    cardFront: {
        margin: 5,
        alignItems: 'center'
    },
    cardBack: {
        margin: 15,
        backgroundColor: '#F0F0F0'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    header: {
        textAlign: 'center',
        backgroundColor: '#f99e1a'
    },
    input: {
        margin: 20,
        
    },
    heroDiv: {
        margin: 10
    },
    text: {
        width: 300
    }
});

class Add extends Component{
    componentDidMount(){
        this.props.dispatch({type:"FETCH_HEROES", payload: 'All'})
    }

    state = {
        isHero: true,
        isFlipped: false,
        newHero: {
            name: '',
            role: '',
            image: '',
            ability_one: '',
            ability_two: '',
            ability_three: '',
            ability_four: '',
            ability_ult: ''
        },
        newMap: {
            name: '',
            type: '',
            image: '',
            description: '',
            hero_one: 0,
            hero_two: 0,
            hero_three: 0
        }
    };

    // handles change for entering hero information
    handleHeroChange = (event, property) => {
        this.setState({
            ...this.state,
            ...this.state.newMap,
            newHero: {
                ...this.state.newHero,
                [property]: event.target.value
            }
        })
    };
    
    handleMapChange = (event, property) => {
        this.setState({
            ...this.state,
            ...this.state.newHero,
            newMap:{
                ...this.state.newMap,
                [property]: event.target.value
            }
        })
    }

    // flips card back over and resets set
    resetForm = () => {
        this.setState({
            ...this.state,
            isFlipped: false,
            newHero: {
                name: '',
                role: this.state.newHero.role,
                image: '',
                ability_one: '',
                ability_two: '',
                ability_three: '',
                ability_four: '',
                ability_ult: ''
            },
            newMap: {
                name: '',
                type: this.state.newMap.type,
                image: '',
                description: '',
                hero_one: 0,
                hero_two: 0,
                hero_three: 0
            }
        })
    }

    // sends new hero information to db
    addHero = (event) => {
        event.preventDefault();
        console.log(this.state.newHero);
        axios.post('/api/hero/add', this.state.newHero)
        .then(response => {
            console.log('ADDED HERO TO DB');
            this.resetForm();
        }).catch(error => {
            console.log('error in hero POST', error)
        })
    };

    // send new map information to db
    addMap = (event) => {
        event.preventDefault();
        console.log(this.state.newMap);
        axios.post('/api/map/add', this.state.newMap)
        .then(respone => {
            console.log('ADDED MAP TO DB');
            this.resetForm();
        }).catch(error => {
            console.log('error in map POST:', error)
        })
    };

    makeEcho = () => {
        this.setState({
            ...this.state,
            newHero: {
                name: 'Echo',
                role: 'DPS',
                image: 'https://bit.ly/2RFdYss',
                ability_one: 'TRI-SHOT - Echo fires 3 shots at once, in a triangle pattern',
                ability_two: 'STICKY BOMBS - Echo fires a volley of sticky bombs that detonates after a delay',
                ability_three: 'FLIGHT - Echo surges forward quickly, then can fly freely.',
                ability_four: 'FOCUSING BEAM - Echo channels a beam for a few seconds, dealing very high damage to targets with less than half health.',
                ability_ult: 'DUPLICATE - Echo duplicates/becomes an enemy hero and gains use of their abilities, including their ultimate ability'
            },
            ...this.state.newMap
        })
    }
    render(){
        const {classes} = this.props;
        return(
            <ReactCardFlip isFlipped={this.state.isFlipped} flipSpeedFrontToBack={1.0}
            flipSpeedBackToFront={1.0}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Card className={classes.cardFront}>
                            <CardActionArea onClick={()=>this.setState({...this.state, isHero:true, isFlipped:true})}>
                                <CardHeader className={classes.header} title="ADD HERO"/>
                                <CardMedia className={classes.media} title="ADD HERO" image="https://bit.ly/3lTyROm" />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={classes.cardFront}>
                            <CardActionArea onClick={()=>this.setState({...this.state, isHero:false, isFlipped:true})}>
                                <CardHeader className={classes.header} title="ADD MAP" />
                                <CardMedia className={classes.media} title="ADD MAP" image="https://bit.ly/3bNn3c5"/>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                {this.state.isHero ? (
                    <Card className={classes.cardBack}>
                        <h2 className={classes.input} onClick={this.makeEcho}>ADD HERO</h2>
                        <form onSubmit={this.addHero} className={classes.input}>
                            <div>
                                <TextField className={classes.text} margin="dense" label="Hero Name" value={this.state.newHero.name} onChange={(event)=>this.handleHeroChange(event, 'name')}/>
                                <RadioGroup row id="heroRoleRadio" onChange={(event)=>this.handleHeroChange(event, 'role')}>
                                    <FormControlLabel value="Tank" control={<Radio />} label="Tank" />
                                    <FormControlLabel value="DPS" control={<Radio />} label="DPS" />
                                    <FormControlLabel value="Support" control={<Radio />} label="Support" />
                                </RadioGroup>
                            </div>
                            <TextField className={classes.text} margin="dense" label="Hero Image" value={this.state.newHero.image} onChange={(event)=>this.handleHeroChange(event, 'image')}/>
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline 
                            label="First Ability" value={this.state.newHero.ability_one} onChange={(event)=>this.handleHeroChange(event, 'ability_one')}/>
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline
                            label="Second Ability" value={this.state.newHero.ability_two} onChange={(event)=>this.handleHeroChange(event, 'ability_two')}/>
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline
                            label="Third Ability" value={this.state.newHero.ability_three} onChange={(event)=>this.handleHeroChange(event, 'ability_three')}/>
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline
                            label="Fourth Ability" value={this.state.newHero.ability_four} onChange={(event)=>this.handleHeroChange(event, 'ability_four')} />
                            <TextField margin="dense" variant="outlined" rows={4} fullWidth multiline
                            label="Ultimate Ability" value={this.state.newHero.ability_ult} onChange={(event)=>this.handleHeroChange(event, 'ability_ult')}/>
                            <IconButton onClick={this.resetForm}><ArrowBackTwoToneIcon fontSize="large"></ArrowBackTwoToneIcon></IconButton>
                            <IconButton type="submit"><AddSharpIcon fontSize="large"></AddSharpIcon></IconButton>
                        </form>
                    </Card>
                ) : (
                    <Card className={classes.cardBack}>
                        <h2 className={classes.input}>ADD MAP</h2>
                        <form onSubmit={this.addMap} className={classes.input}>
                            <TextField className={classes.text} margin="dense" label="Map Name" value={this.state.newMap.name} onChange={(event)=>this.handleMapChange(event,'name')}/>
                            <RadioGroup row id="mapTypeRadio" onChange={(event)=>this.handleMapChange(event,'type')}>
                                <FormControlLabel value="Assault" control={<Radio/>} label="Assault"/>
                                <FormControlLabel value="Escort" control={<Radio/>} label="Escort"/>
                                <FormControlLabel value="Control" control={<Radio/>} label="Control"/>
                                <FormControlLabel value="Hyrid" control={<Radio/>} label="Hybrid"/>
                            </RadioGroup>
                            <TextField className={classes.text} margin="dense" label="Map Image" value={this.state.newMap.image} onChange={(event)=>this.handleMapChange(event,'image')}/>
                            <TextField multiline fullWidth rows={4} margin="dense" variant="outlined"
                            label="Map Description" value={this.state.newMap.description} onChange={(event)=>this.handleMapChange(event,'description')}/>
                            <div className={classes.heroDiv}>
                                <h4>Map Heroes</h4>
                                <FormControl className={classes.heroDiv}>
                                    <NativeSelect onChange={(event)=>this.handleMapChange(event,'hero_one')}>
                                        <option aria-label='None' value=''/>
                                        {this.props.store.heroes.map(hero => (
                                            <option key={hero.id} value={hero.id}>{hero.name}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                                <FormControl className={classes.heroDiv}>
                                    <NativeSelect onChange={(event)=>this.handleMapChange(event,'hero_two')}>
                                        <option aria-label='None' value=''/>
                                        {this.props.store.heroes.map(hero => (
                                            <option key={hero.id} value={hero.id}>{hero.name}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                                <FormControl className={classes.heroDiv}>
                                    <NativeSelect onChange={(event)=>this.handleMapChange(event,'hero_three')}>
                                        <option aria-label='None' value=''/>
                                        {this.props.store.heroes.map(hero => (
                                            <option key={hero.id} value={hero.id}>{hero.name}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                            </div>
                            <br/>
                            <IconButton onClick={this.resetForm}><ArrowBackTwoToneIcon fontSize="large"></ArrowBackTwoToneIcon></IconButton>
                            <IconButton type="submit"><AddSharpIcon fontSize="large"></AddSharpIcon></IconButton>
                        </form>
                        
                    </Card>
                )}
                
            </ReactCardFlip>
        )
    }
}

export default connect(mapStoreToProps)(withStyles(styles)(Add));