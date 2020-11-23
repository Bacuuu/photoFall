import React, { BaseSyntheticEvent, useEffect } from 'react';
import { throttle } from 'throttle-debounce'
import './App.css';
import PhotoView from './components/PhotoView'
import SimplePhoto from './components/simplePhoto'
import photo from './color.png'
function App() {
  const [photoVisible, setVisible] = React.useState(false);
  const [howmanyPerRow, setPerRow] = React.useState(4)

  const handleResize = throttle(500, false, (e:any) => {
    const width = e.currentTarget.innerWidth;
    if ( width > 1500) {
      setPerRow(4)
    } else if (width > 1000) {
      setPerRow(3)
    } else {
      setPerRow(2)
    }
  })
  
  useEffect(() => {
    const width = window.innerWidth;
    if ( width > 1500) {
      setPerRow(4)
    } else if (width > 1000) {
      setPerRow(3)
    } else {
      setPerRow(2)
    }
    window.addEventListener('resize', handleResize) //监听页面resize
  }, [handleResize])



  function toggleImg () {
    setVisible(true)
  }
  function photoClose () {
    setVisible(false)
  }
  function getSimpleHeight (e:BaseSyntheticEvent) {
    // console.log(e)
  }
  return (
    <div className="App">
      <header className="App-header">
        <SimplePhoto
        photo={photo}
        howManyPerRow={howmanyPerRow}
        onClick={toggleImg}
        getHeight={getSimpleHeight}
        whichColumn={1}/>
        <PhotoView
          photoImages={[photo, photo, photo]}
          photoNow={0}
          photoVisible={photoVisible}
          onClose={photoClose}
          ></PhotoView>
      </header>
    </div>
  );
}
export default App;
