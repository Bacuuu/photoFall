import React, { useEffect } from 'react';
import { throttle } from 'throttle-debounce'
import './App.css';
import PhotoView from './components/PhotoView'
import photo from './color.png'
function App() {
  const [photoVisible, setVisible] = React.useState(false);

  
  useEffect(() => {
    window.addEventListener('resize', handleResize) //监听滚动
  }, [])

  const handleResize = throttle(100, false, (e: any) => {
    console.log(e.currentTarget.innerHeight, e.currentTarget.innerWidth)
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
        <button onClick={toggleImg}></button>
        <PhotoView
          photoImages={[photo, photo, photo]}
          photoNow={6}
          photoVisible={photoVisible}
          onClose={photoClose}
          ></PhotoView>
      </header>
    </div>
  );
}
export default App;
