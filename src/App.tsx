import React, { BaseSyntheticEvent, useEffect } from 'react';
import { throttle } from 'throttle-debounce'
import './App.css';
import PhotoView from './components/PhotoView'
import SimplePhoto from './components/simplePhoto'
import photo from './color.png'
import { apiGetImage } from './api/getImage'
import { getLineAndCharacterOfPosition } from 'typescript';

interface Iphoto {
  index: number,
  link: string,
  intro: string,
}

interface photoApiData {
  link: string,
  name: string,
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
    heightNow[whichColumn - 1] += height;
    setHeightArray(heightNow);
  }

  /**
   * 计算将图片插入哪个列
   */
  function whichColToIns() {
    console.log(heightArray)
    return heightArray.indexOf(Math.min(...heightArray)) + 1
  }

  /**
   * 获取图片并做后续操作,photoArray,whichColToIns
   */
  async function getImages () {
    const data:photoApiData[] = (await apiGetImage()).data.data
    // const photoList:Iphoto[] = [];
    data.forEach(i => {
      setPhotoArray(state => [...state, {
        index: state.length + 1,
        link: i.link,
        intro: i.intro
      }])
    })
    // setPhotoArray(photoList)
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
    console.log(photoArray, heightArray)
    setPreview(true)
  }

  // 取消preview
  function cancelPreview () {
    setPreview(false)
  }
  // 获取单张图片的naturalHeight
  function getSimpleHeight (e:BaseSyntheticEvent) {
    addToHeight(whichColToIns(), e.target.naturalHeight)
  }


  // 初始化，页面自适应 
  useEffect(() => {
    setInterval(() => {
      getImages()
    }, 10000);
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
        {
          photoArray.map(i => {
            return (
              <SimplePhoto
              key={i.index}
              photo={i.link}
              howManyPerRow={howmanyPerRow}
              onClick={handlePreview}
              getHeight={getSimpleHeight}
              whichColumn={whichColToIns()}/>
            )
          })
        }

        <PhotoView
          photoImages={photoArray.map(v => v.link)}
          photoNow={0}
          photoVisible={photoPreview}
          onClose={cancelPreview}
          ></PhotoView>
      </header>
    </div>
  );
}
export default App;
