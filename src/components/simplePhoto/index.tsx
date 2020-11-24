import React, { BaseSyntheticEvent } from 'react'
import styles from './photo.module.scss'
interface typeProps {
  photo: string,
  howManyPerRow: number,
  whichColumn: number,
  onClick():void,
  getHeight(e:BaseSyntheticEvent):void,
}

function SimplePhoto(props: typeProps) {
  return (
    <div onClick={props.onClick} className={`${styles['simple-photo']} ` +  styles[`width-${props.howManyPerRow}`] +' '+ styles[`left-${props.howManyPerRow}-${props.whichColumn}`]} >
      <img className={styles.photo} onLoad={props.getHeight} src={props.photo} alt=""/>
    </div>
  )
}

export default SimplePhoto;
