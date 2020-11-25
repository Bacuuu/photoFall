import React, { BaseSyntheticEvent, useState } from 'react'
import styles from './photo.module.scss'
interface typeProps {
  photo: string,
  howManyPerRow: number,
  whichColumn: number,
  onClick():void,
  getHeight(e:BaseSyntheticEvent):void,
}

function SimplePhoto(props: typeProps) {
  const [whichcolumn, setwhichcolumn] = useState(props.whichColumn)
  return (
    <div onClick={props.onClick} className={`${styles['simple-photo']} ` +  styles[`width-${props.howManyPerRow}`] +' '+ styles[`left-${props.howManyPerRow}-${whichcolumn}`]} >
      <img className={styles.photo} onLoad={props.getHeight} src={props.photo} alt=""/>
    </div>
  )
}

export default SimplePhoto;
