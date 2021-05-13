import React from 'react';
import styles from './Photo.module.css';

const Photo = (props) => {
	

  return (
    <div className={styles.photo}>
      <img className={styles.img} src={props.src} alt={'marsian_photo'} />            
    </div>
  );
};

export default Photo;