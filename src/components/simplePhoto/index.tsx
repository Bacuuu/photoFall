import React from 'react'
import './photo.scss'
interface typeProps {
  photo: string,
  howManyPerRow: number,
  onClick():any
}

function SimplePhoto(props: typeProps) {
  return (
    <div onClick={props.onClick} className={`simple-photo width-${props.howManyPerRow}`} >
      <img className="photo" src={props.photo} alt=""/>
    </div>
  )
}

export default SimplePhoto;
