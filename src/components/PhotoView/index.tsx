import React from 'react'
import { PhotoSlider } from 'react-photo-view'
import 'react-photo-view/dist/index.css'
import './photo.scss'
// import photo from '../../color.png'
// const photoImages = [photo]
interface typeProps {
  photoImages: Array<string>,
  photoNow: number,
  photoVisible: boolean,
  onClose():any,
}

function ImageView(props: typeProps) {
  const [photoIndex, setPhotoIndex] = React.useState(props.photoNow);
  
  const child = (
    <div>
      <h2>great Idea!</h2>
      <h4>测试更新更新</h4>
    </div>
  )
  return (
    <div>
      <PhotoSlider
        images={props.photoImages.map(item => ({ src: item, intro: child }))}
        visible={props.photoVisible}
        onClose={props.onClose}
        index={photoIndex}
        onIndexChange={setPhotoIndex}
      />
    </div>
  );
}

export default ImageView;
