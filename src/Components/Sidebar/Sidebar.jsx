import React, {Component} from 'react';
import Photo from './Photo/Photo'
import styles from './Sidebar.module.css';


class Sidebar extends Component {
	constructor() {
		super();
		this.allPhotosSRC = [];
		this.rover = 'curiosity';
		this.camera = 'fhaz';
		this.sol = '';
		this.page = 1;
		this.state = {
			photosSRC: [],			
			endPage: false
		}

	}


//https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631160503676E02_DXXX.jpg 
//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY 
	getURL = ()=>{
		const startURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/`;
		const finishURL = `&api_key=DEMO_KEY`;
		const camera = `&camera=${this.camera}`;
		const str=`${startURL}${this.rover}/photos?sol=${this.sol}&page=${this.page}&camera=${this.camera}${finishURL}`;
		console.log(str);
		return `${startURL}${this.rover}/photos?sol=${this.sol}&page=${this.page}&camera=${this.camera}${finishURL}`;
	}

	getData = async () => {
		const currentURL=this.getURL();
		console.log(currentURL);
		const response = await fetch(currentURL);
    	const items = await response.json();    	
    	//console.log(items);
    	const arr = items.photos.map((obj) => (obj.img_src));
    	console.log(`intro getData ${arr.length}; ${arr}`);
    	return arr;
	}

	getFirstPage = async () =>{				
		this.allPhotosSRC = [];		
    	/*const arrSRC = await this.getData();
    	console.log(`after getData ${arrSRC}`);
    	const end = (arrSRC.length<25) ? true : false;    	 
    	this.allPhotosSRC = arrSRC;
    	const arr = this.allPhotosSRC;*/
    	let arrSRC = [];
    	for(let i=0;i<=24;i++){
    		arrSRC.push(`https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631160503676E02_DXXX.jpg`);
    	};    	 	
    	this.setState({ photosSRC: arrSRC/*,  endPage: end*/});
	}

	selectCamera = (e) => {
		this.camera = e.target.value;
	}

	selectRover = (e) => {
		this.rover = e.target.value;
	}

	selectSol = (e) =>{
		this.sol = +e.target.value;
	}

	getNextPage =  async () =>{		
		if (!this.state.endPage){
			this.page++;
			//const url = this.getURL();
			const newArrSRC = await this.getData();
    		const arr = this.allPhotosSRC.concat(newArrSRC);    		
    		this.allPhotosSRC = arr;
    		const end = (newArrSRC.length<25) ? true : false;
    		this.setState({ photosSRC: arr,  endPage: end});
		}		
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.sidebar}>
							<div className={styles.inputs}>					
						            <div className={styles.input}>
						              <label htmlFor="rover" className={styles.inputLabel}>
						                Rover:
						              </label>
						              <select
						                className={styles.inputField}
						                name="rover"
						                id="rover"
						                onChange={this.selectRover}
						              >
						                <option value="curiosity">Curiosity</option>
						                <option value="opportunity">Opportunity</option>
						                <option value="spirit">Spirit</option>			                
						              </select>
						              <span className="selector__arrow"></span>
						            </div>
			
						            <div className={styles.input}>
						              <label htmlFor="rover" className={styles.inputLabel}>
						                Camera:
						              </label>
						              <select
						                className={styles.inputField}
						                name="camera"
						                id="camera"
						                onChange={this.selectCamera}
						              >
						                <option value="fhaz">Front Camera</option>
						                <option value="rhaz">Rear Camera</option>			                
						              </select>
						              <span className="selector__arrow"></span>
						            </div>
			
						            <div className={styles.input}>
						              <label htmlFor="sol" className={styles.inputLabel}>
						                Sol (integer number):
						              </label>
						              <input
						                className={styles.inputField}
						                name="sol"
						                id="sol"
						                type="text"
						                defaultValue={this.sol}
						                onChange={this.selectSol}
						              />			            
							        </div>
							</div>
							<button onClick={this.getFirstPage} className={styles.btnLoad}>Load</button>
				</div>
				<div className={styles.gallery}>
					<div className={styles.galleryArea}>
						{this.state.photosSRC.map((sorce) => (
            			<Photo src={sorce}  />
          ))}
					</div>
					<button onClick={this.getNextPage} className={styles.btnLoad}>Load more</button>
				</div>
			</div>
			)
	}
};

export default Sidebar;

/*const currentURL=this.getURL();
		console.log(currentURL);
		const response = await fetch(currentURL);
    	const items = await response.json();    	
    	console.log(items);
    	const arrSRC = items.photos.map((obj) => (obj.img_src));*/
    	/*let arrSRC = [];
    	for(let i=0;i<=24;i++){
    		arrSRC.push(`https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631160503676E02_DXXX.jpg`);
    	};*/
//console.log(arr);
    	/*return arrSRC;*/   

//console.log(p, pp);
			/*const currentURL = getURL();
			const response = await fetch(currentURL);
    		const items = await response.json();    		
    		const arrSRC = items.photos.map((obj) => (obj.img_src));*/
    		/*додати перевірку що масив не пустий*/
    		/*let newArrSRC = [];
    	for(let i=0;i<=24;i++){
    		newArrSRC.push(`https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631160503676E02_DXXX.jpg`);
    	};*/
    		//this.allPhotosSRC.concat(newArrSRC);
    		//const newArrSRC = await this.getData();
    		//console.log(newArrSRC);