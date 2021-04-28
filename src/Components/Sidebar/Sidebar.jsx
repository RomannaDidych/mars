import React, {Component} from 'react';
import Photo from './Photo/Photo'
import styles from './Sidebar.module.css';


class Sidebar extends Component {
	constructor() {
		super();
		this.allPhotosSRC = [];
		this.rover = 'curiosity';
		this.camera = 'fhaz'
		this.sol = 1000;
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
		return `${startURL}${this.rover}/photos?sol=${this.sol}&page=${this.page}&camera=${this.camera}${finishURL}`
	}

	getFirstPage = async () =>{
		this.allPhotosSRC = [];		
		/*const currentURL=this.getURL();
		console.log(currentURL);
		const response = await fetch(currentURL);
    	const items = await response.json();    	
    	console.log(items);
    	const arrSRC = items.photos.map((obj) => (obj.img_src));*/
    	let arrSRC = [];
    	for(let i=0;i<=24;i++){
    		arrSRC.push(`https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631160503676E02_DXXX.jpg`);
    	};
    	const end = (arrSRC.length<25) ? true : false;    	 
    	this.allPhotosSRC = [...arrSRC];
    	const arr = this.allPhotosSRC;
    	console.log(arr);
    	/*return arrSRC;*/    	
    	this.setState({ photosSRC: arrSRC,  endPage: end});
	}

	selectCamera = (e) => {}

	selectRover = (e) => {}

	selectSol = (e) =>{}

	getNextPage = () =>{		
		if (!this.state.endPage){
			this.page++;
			/*const currentURL = getURL();
			const response = await fetch(currentURL);
    		const items = await response.json();    		
    		const arrSRC = items.photos.map((obj) => (obj.img_src));*/
    		/*додати перевірку що масив не пустий*/
    		let arrSRC = [];
    	for(let i=0;i<=24;i++){
    		arrSRC.push(`https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631160503676E02_DXXX.jpg`);
    	};
    		this.allPhotosSRC.concat(arrSRC);
    		const arr = this.allPhotosSRC;
    		const end = (arrSRC.length<25) ? true : false;
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
						                Marsian day (integer number):
						              </label>
						              <input
						                className={styles.inputField}
						                name="sol"
						                id="sol"
						                type="text"
						                value={this.sol}
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