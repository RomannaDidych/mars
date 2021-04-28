import React, {Component} from 'react';
import Photo from './Photo/Photo';
import styles from './Gallery.module.css';


class Gallery extends Component {
	constructor() {
		super();
		this.photos = [];

	}

	getPhotos = async (e) =>{
		let arr;
		const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&page=5&api_key=DEMO_KEY`);
    	const items = await response.json();
    	console.log(items);
	}

	render() {
		return (
			<div className={styles.container}>
				<button onClick={this.getPhotos} className={styles.btnLoad}>Load</button>
			</div>
			)
	}
}

export default Gallery;
