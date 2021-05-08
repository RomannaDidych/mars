import React, { Component } from "react";
import Photo from "./Photo/Photo";
import styles from "./Sidebar.module.css";

class Sidebar extends Component {
  constructor() {
    super();
    this.allPhotosSRC = [];
    this.page = 1;
    this.state = {
      photosSRC: [],
      rover: "curiosity",
      camera: "fhaz",
      sol: 0,
      isTextVisible: false,
      isButtonVisible: false,
      isButtonDisabled: false,
    };
  }

  getURL = () => {
    const startURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/`;
    const finishURL = `&api_key=DEMO_KEY`;
    return `${startURL}${this.state.rover}/photos?sol=${this.state.sol}&page=${this.page}&camera=${this.state.camera}${finishURL}`;
  };

  getData = async () => {
    const currentURL = this.getURL();
    const response = await fetch(currentURL);
    const items = await response.json();
    const arr = items.photos.map((obj) => obj.img_src);
    return arr;
  };

  getFirstPage = async (e) => {
  	e.preventDefault();
    this.allPhotosSRC = [];
    const arrSRC = await this.getData();
    if (arrSRC.length === 0) {
      await this.setState({ isTextVisible: true, isButtonVisible: false });
    } else {
      await this.setState({ isTextVisible: false, isButtonVisible: true });
    }
    this.allPhotosSRC = arrSRC;
    const arr = this.allPhotosSRC;
    const condition = arrSRC.length < 25 ? true : false;
    await this.setState({ photosSRC: arrSRC, isButtonDisabled: condition });
  };

  selectCamera = async (e) => {
    await this.setState({ camera: e.target.value });
  };

  selectRover = async (e) => {
    await this.setState({ rover: e.target.value });
  };

  selectSol = async (e) => {
    const number = +e.target.value;
    await this.setState({ sol: number });
  };

  getNextPage = async () => {
    if (!this.state.endPage) {
      this.page++;
      const url = this.getURL();
      const newArrSRC = await this.getData();
      const arr = this.allPhotosSRC.concat(newArrSRC);
      this.allPhotosSRC = arr;
      const condition = newArrSRC.length < 25 ? true : false;
      await this.setState({ photosSRC: arr, isButtonDisabled: condition });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <form className={styles.formInput} onSubmit={this.getFirstPage}>
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
              <label htmlFor="camera" className={styles.inputLabel}>
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
                defaultValue={this.state.sol}
                onChange={this.selectSol}
              />
            </div>
          </div>
          <button type="submit"  className={styles.btnLoad}>
            Load
          </button>
        </form>
        <div className={styles.gallery}>
          <div className={styles.galleryArea}>
            {this.state.photosSRC.map((sorce) => (
              <Photo src={sorce} />
            ))}
          </div>
          <p
            className={`${
              this.state.isTextVisible
                ? styles.message
                : styles.messageUnvisible
            }`}
          >
            No photos found! Change your filter parameters!
          </p>
          <button
            onClick={this.getNextPage}
            className={`${
              this.state.isButtonVisible
                ? styles.btnLoadMore
                : styles.btnUnvisible
            }`}
            disabled={this.state.isButtonDisabled}
          >
            Load more
          </button>
        </div>
      </div>
    );
  }
}

export default Sidebar;

//onClick={this.getFirstPage}