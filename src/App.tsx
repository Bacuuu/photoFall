import React, { BaseSyntheticEvent, useEffect } from 'react';
import { throttle } from 'throttle-debounce'
import './App.css';
import PhotoView from './components/PhotoView'
import SimplePhoto from './components/simplePhoto'
import photo from './color.png'

interface Iphoto {
  index: number,
  link: string,
  intro: string,
}

function App() {
  // 图片是否处于预览状态
  const [photoPreview, setPreview] = React.useState<boolean>(false);
  // 每行展示多少列图片
  const [howmanyPerRow, setPerRow] = React.useState<number>(4);
  // 图片信息的array
  const [photoArray, setPhotoArray] = React.useState<Iphoto[]>([]);
  // 高度信息,每列的元素当前高度,例如三列 [123, 342, 542]
  const [heightArray, setHeightArray] = React.useState<number[]>([])
  // 图片的jsx,感觉应该是直接放到render里
  // const [photoDom, setPhotoDom] = React.useState<JsxElement>();

  /**
   * 更新统计高度
   * @param whichColumn 第几行增加height
   * @param height height高度
   */
  function addToHeight(whichColumn:number, height: number) {
    const heightNow = heightArray;
    heightNow[whichColumn] += height;
    setHeightArray(heightNow);
  }

  function whichColToIns(heightArray:number[]) {
    
  }

  // resize回调函数
  const handleResize = throttle(500, false, (e:any) => {
    const width = e.currentTarget.innerWidth;
    if ( width > 1500) {
      if (heightArray.length === 4) {
        return;
      }
      setPerRow(4)
      setHeightArray(new Array(4).fill(0))
    } else if (width > 1000) {
      if (heightArray.length === 3) {
        return;
      }
      setPerRow(3)
      setHeightArray(new Array(3).fill(0))
    } else {
      if (heightArray.length === 2) {
        return;
      }
      setPerRow(2)
      setHeightArray(new Array(2).fill(0))
    }
  })

  // preview
  function handlePreview () {
    setPreview(true)
  }

  // 取消preview
  function cancelPreview () {
    setPreview(false)
  }
  // 获取单张图片的naturalHeight
  function getSimpleHeight (e:BaseSyntheticEvent) {
    // console.log(e)
  }


  // 初始化，页面自适应 
  useEffect(() => {
    const width = window.innerWidth;
    if ( width > 1500) {
      setPerRow(4);
      setHeightArray(new Array(4).fill(0))
      // 重排
    } else if (width > 1000) {
      setPerRow(3)
      setHeightArray(new Array(3).fill(0))
      // 重排
    } else {
      setPerRow(2)
      setHeightArray(new Array(2).fill(0))
      // 重排
    }
    window.addEventListener('resize', handleResize) // 监听页面resize
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/* {
          photoArray.map(i => {
            return (
              <SimplePhoto
              photo={photo}
              howManyPerRow={howmanyPerRow}
              onClick={handlePreview}
              getHeight={getSimpleHeight}
              whichColumn={1}/>
            )
          })
        } */}
        <SimplePhoto
        photo={photo}
        howManyPerRow={howmanyPerRow}
        onClick={handlePreview}
        getHeight={getSimpleHeight}
        whichColumn={1}/>

        <PhotoView
          photoImages={[photo, photo, photo]}
          photoNow={0}
          photoVisible={photoPreview}
          onClose={cancelPreview}
          ></PhotoView>
      </header>
    </div>
  );
}
export default App;
