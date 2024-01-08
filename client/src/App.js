import React from "react";
import { invert } from "./pkg/sap.js";

export default function App(){
    const [imageData,setImageData] = React.useState('')
    const [ext,setExt] = React.useState('')
    const setImage = (e) => {
        if (e.target.files[0]) {
            switch (e.target.files[0].name.split('.').at(-1)) {
                case "jpg":
                    setExt("jpg")
                    break;
                case "png":
                    setExt("png")
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
    return (
        <div className="flex h-screen w-screen">
        <div className="h-screen w-40 bg-black"></div>
            <div className="max-w-md mx-auto space-y-8">
                <h1 className="max-w-md mx-auto text-4xl pl-10 font-mono">Image inverting</h1>
                <div className="flex max-w-md mx-auto justify-between">
                        <label className="rounded-sm p-2 cursor-pointer hover:bg-slate-900 hover:text-white transition-all shadow-sm shadow-slate-300 bg-slate-100">
                            <input onChange={setImage} type="file" className="overflow-hidden w-0"/>
                            Choose
                        </label>
                        <button disabled = {imageData?false:true} onClick={()=> setImageData(prev=>`data:image/jpg;base64, ${invert(prev.substring(prev.indexOf(',')+1).trim(),ext)}`)} className="rounded-sm p-2 hover:bg-slate-900 hover:text-white transition-all shadow-sm shadow-slate-300 bg-slate-100">Invert</button>
                </div>
                <div className={`max-w-md mx-auto mt-8 w-96 h-64 ${imageData?'':'shadow-md border'} `}>
                    <img src={imageData} download = "new-image.jpg" alt="There is no picture yet" className={`object-cover ${imageData?'':'hidden'}`}/>
                </div>
                
            </div>
        </div>
    )
}