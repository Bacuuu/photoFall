import React, { useEffect } from 'react';
import { throttle } from 'throttle-debounce'
import './App.css';
import PhotoView from './components/PhotoView'
import SimplePhoto from './components/simplePhoto'
import photo from './color.png'
function App() {
  const [photoVisible, setVisible] = React.useState(false);
  const [howmanyPerrow, setPerrow] = React.useState(4)
  
  useEffect(() => {
    window.addEventListener('resize', handleResize) //监听滚动
  }, [])

  const handleResize = throttle(500, false, (e: any) => {
    const width = e.currentTarget.innerWidth;
    if ( width > 1500) {
      setPerrow(4)
    } else if (width > 1000) {
      setPerrow(3)
    } else {
      setPerrow(2)
    }
  })

  function toggleImg () {
    setVisible(true)
  }
  function photoClose () {
    setVisible(false)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <SimplePhoto
        photo={photo}
        howManyPerRow={howmanyPerrow}
        onClick={toggleImg}/>
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
