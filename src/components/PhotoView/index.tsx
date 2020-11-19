import React from 'react'
import { PhotoSlider } from 'react-photo-view'
import 'react-photo-view/dist/index.css'
import './photo.scss'
// import photo from '../../color.png'
// const photoImages = [photo]
interface typeProps {
  photoImages: Array<string>,
  
}

function ImageView(props: typeProps) {
  const [visible, setVisible] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);
  
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
        visible={visible}
        onClose={() => setVisible(false)}
        index={photoIndex}
        onIndexChange={setPhotoIndex}
      />
    </div>
  );
}

export default ImageView;
