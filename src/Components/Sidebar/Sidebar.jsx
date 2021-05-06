import React, { Component } from "react";
import Photo from "./Photo/Photo";
import styles from "./Sidebar.module.css";

class Sidebar extends Component {
  constructor() {
    super();
    this.isTextVisible = false;
    this.isButtonVisible = false;
    this.isButtonDisabled = false;
    this.allPhotosSRC = [];
    this.rover = "curiosity";
    this.camera = "fhaz";
    this.sol = 0;
    this.page = 1;
    this.state = {
      photosSRC: [],
    };
  }

  getURL = () => {
    const startURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/`;
    const finishURL = `&api_key=DEMO_KEY`;
    const camera = `&camera=${this.camera}`;    
    return `${startURL}${this.rover}/photos?sol=${this.sol}&page=${this.page}&camera=${this.camera}${finishURL}`;
  };

  getData = async () => {
    const currentURL = this.getURL();    
    const response = await fetch(currentURL);
    const items = await response.json();    
    const arr = items.photos.map((obj) => obj.img_src);    
    return arr;
  };

  getFirstPage = async () => {
    this.allPhotosSRC = [];
    const arrSRC = await this.getData();
    if (arrSRC.length === 0) {
      this.isButtonVisible = false;
      this.isTextVisible = true;
    } else {
      this.isButtonVisible = true;
      this.isTextVisible = false;
    }
    this.allPhotosSRC = arrSRC;
    const arr = this.allPhotosSRC;
    this.isButtonDisabled = arrSRC.length < 25 ? true : false;
    await this.setState({ photosSRC: arrSRC });
  };

  selectCamera = (e) => {
    this.camera = e.target.value;
  };

  selectRover = (e) => {
    this.rover = e.target.value;
  };

  selectSol = (e) => {
    this.sol = +e.target.value;
  };

  getNextPage = async () => {
    if (!this.state.endPage) {
      this.page++;
      const url = this.getURL();
      const newArrSRC = await this.getData();      
      this.isButtonDisabled = newArrSRC.length < 25 ? true : false;
      const arr = this.allPhotosSRC.concat(newArrSRC);
      this.allPhotosSRC = arr;
      await this.setState({ photosSRC: arr });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <label htmlFor="rover" className={styles.inputLabel}>
                Rover:
              </label>
              <div className={styles.inputWrapper}>
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
                <span className={styles.inputArrow}></span>
              </div>
            </div>

            <div className={styles.input}>
              <label htmlFor="rover" className={styles.inputLabel}>
                Camera:
              </label>
              <div className={styles.inputWrapper}>
                <select
                  className={styles.inputField}
                  name="camera"
                  id="camera"
                  onChange={this.selectCamera}
                >
                  <option value="fhaz">Front Camera</option>
                  <option value="rhaz">Rear Camera</option>
                </select>
                <span className={styles.inputArrow}></span>
              </div>
            </div>

            <div className={styles.input}>
              <label htmlFor="sol" className={styles.inputLabel}>
                Sol (integer number):
              </label>
              <input
                className={styles.inputField}
                name="sol"
                id="sol"
                type="number"
                defaultValue={this.sol}
                onChange={this.selectSol}
              />
            </div>
          </div>
          <button onClick={this.getFirstPage} className={styles.btnLoad}>
            Load
          </button>
        </div>
        <div className={styles.gallery}>
          <div className={styles.galleryArea}>
            {this.state.photosSRC.map((sorce) => (
              <Photo src={sorce} />
            ))}
          </div>
          <p
            className={`${
              this.isTextVisible ? styles.message : styles.messageUnvisible
            }`}
          >
            No photos found! Change your filter parameters!
          </p>
          <button
            onClick={this.getNextPage}
            className={`${
              this.isButtonVisible ? styles.btnLoadMore : styles.btnUnvisible
            }`}
            disabled={this.isButtonDisabled}
          >
            Load more
          </button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
