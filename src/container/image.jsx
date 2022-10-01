import React ,{useState,useRef}from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './imagecrop.css';

const Image = () => {
const [src,selectFile]=useState(null);
const canvasRef=useRef(null);
const[xAxisin,setXaxisin]=useState("");
const [yAxisin,setYaxisin]=useState("");
const [output, setOutput] = useState(null);
const [crop, setCrop] = useState({});

const handleOnchange=(e)=>{
  selectFile(URL.createObjectURL(e.target.files[0]))
}

const getCropData=()=>{
  const image = document.getElementById('image')
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );
    
  const base64Image = canvas.toDataURL('image/jpeg');
  setOutput(base64Image);
}

const onchangeHandler=(e)=>{
  if(e.target.name=="xaxis"){
   setXaxisin(e.target.value)
  }
  if(e.target.name=="yaxis"){
    setYaxisin(e.target.value)
  }
}
const inputsubmitHandler=(e)=>{
  e.preventDefault();
  setCrop({ unit: 'px', 
  width:xAxisin,
  height:yAxisin,
  x: 0,
  y: 0})
  setXaxisin("");
  setYaxisin("");
}

  return (
    <div>
      <div>
      <input type="file" accepts='image/*' onChange={handleOnchange}/>     
      </div> 
      <div>
        <form>
        <input type="number" name='xaxis' value={xAxisin} onChange={onchangeHandler}/>
        <input type="number" name='yaxis' value={yAxisin} onChange={onchangeHandler}/>
        <button onClick={inputsubmitHandler}>submit</button>
        </form>
      </div>
      <ReactCrop crop={crop} onChange={c => setCrop(c)} >       
      <img src={src} alt="" id='image' />
      </ReactCrop>
      <canvas ref={canvasRef} className="cropimage"></canvas>
      <button  id="cropbtn" onClick={getCropData}>OnCrop</button>
      <div className='croppedblock'>{output && <img src={output} alt="crop" />}</div>
    </div>
  )
}

export default Image