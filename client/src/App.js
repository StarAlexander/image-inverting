import React from "react";
import { invert,resize } from "./pkg/sap.js";

export default function App(){
    const [imageData,setImageData] = React.useState('')
    const [ext,setExt] = React.useState('')
    const [isResizing,setIsResizing] = React.useState(false)
    const [width,setWidth] = React.useState(0)
    const [height,setHeight] = React.useState(0)
    const setImage = (e) => {
        if (e.target.files[0]) {
            switch (e.target.files[0].name.split('.').at(-1)) {
                case "jpg":
                    setExt("jpg")
                    break;
                case "png":
                    setExt("png")
                    break;
                case "bmp":
                    setExt("bmp")
                    break;
                default:
                    return;
            }
            const reader = new FileReader()
            reader.onload = (ev) => {
                setImageData(ev.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }

    }

    const invertData = () => {
        const str = invert(normalize(imageData),ext)
        if (str !== "Error") {
            setImageData(`data:image/${ext};base64, ${str}`)
        }
    }

    const resize_with_meta = ()=>{
        const str = resize(normalize(imageData),Number(width),Number(height),ext)
        setImageData(`data:image/${ext};base64, ${str}`)
    }
    const normalize = (str) => str.substring(str.indexOf(',')+1).trim()
    
    return (
        <div className="flex h-screen w-screen">
        <div className="h-screen w-40 bg-black space-y-4">
            <div onClick={()=>setIsResizing(false)} className="w-full h-auto p-3 cursor-pointer text-white hover:bg-white hover:text-black transition-all">
                <p className=" max-w-md mx-auto">Invert</p>
            </div>
            <div onClick={()=>setIsResizing(true)} className="w-full h-auto p-3 cursor-pointer text-white hover:bg-white hover:text-black transition-all">
                <p className=" max-w-md mx-auto">Resize</p>
            </div>
            <div className="w-full h-auto p-3 cursor-pointer text-white hover:bg-white hover:text-black transition-all">
                <p className=" max-w-md mx-auto">Crop</p>
            </div>
        </div>
            <div className="max-w-md mx-auto space-y-8">
                <h1 className="max-w-md mx-auto text-4xl pl-10 font-mono">Image inverting</h1>
                <div className="flex max-w-md mx-auto justify-between">
                        <label className="rounded-sm p-2 cursor-pointer hover:bg-slate-900 hover:text-white transition-all shadow-sm shadow-slate-300 bg-slate-100">
                            <input onChange={setImage} type="file" className="overflow-hidden w-0"/>
                            Choose
                        </label>
                        <button  onClick={()=>setImageData('')} className={` ${imageData?'':'hidden'} rounded-sm p-2 hover:bg-slate-900 hover:text-white transition-all shadow-sm shadow-slate-300 bg-slate-100`}>Clear</button>
                        <button  onClick={invertData} className={` ${imageData && !isResizing?'':'hidden'} rounded-sm p-2 hover:bg-slate-900 hover:text-white transition-all shadow-sm shadow-slate-300 bg-slate-100`}>Invert</button>
                </div>
                {isResizing && 
                <div className="flex p-3  bg-slate-200  justify-between space-x-2 w-full rounded-md">
                <p className="font-mono p-1">width:</p>
                <input type="number" value={width} min={0} onChange={(e)=>setWidth(e.target.value)} className="outline-none border-b w-12 border-black"/>
                <p className="font-mono p-1">height:</p>
                <input type="number" value={height} min={0} onChange={(e)=>setHeight(e.target.value)} className="outline-none border-b w-12 border-black"/>
                <button onClick={resize_with_meta} className="bg-black text-white hover:bg-white hover:text-black rounded-sm transition-all p-2">apply</button>
            </div>
            }
                
                <div className={`max-w-md mx-auto mt-8 w-96 h-64 ${imageData?'':'shadow-md border'} `}>
                    <img src={imageData} download = "new-image.jpg" alt="There is no picture yet" className={`${imageData?'':'hidden'} object-contain`}/>
                </div>
                <button className={`w-full ${imageData? '':'hidden'} bg-black text-white rounded-sm transition-all p-2 hover:bg-slate-100 hover:text-black`}><a download={"image"} href={imageData}>Save</a></button>
            </div>
        </div>
    )
}