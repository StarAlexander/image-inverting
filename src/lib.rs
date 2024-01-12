use std::io::Cursor;

use wasm_bindgen::prelude::*;
use image::{imageops, DynamicImage};
use image::io::Reader as ImageReader;
use base64::{Engine as _, engine::general_purpose};


pub fn img_from_base(s:&str) -> DynamicImage {
    let bytes = general_purpose::STANDARD.decode(s.to_string()).unwrap();
    ImageReader::new(Cursor::new(bytes)).
    with_guessed_format().
    unwrap()
    .decode()
    .unwrap()
}

pub fn encode_with_extension(img:&mut DynamicImage, mut buf: Vec<u8>, f:&str) -> String {
    match f {
        "jpg" => img.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Jpeg(100)).unwrap(),
        "png" => img.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Png).unwrap(),
        "bmp" => img.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Bmp).unwrap(),
        _ => {
            return "Error".to_string();
        }
    }
    let res = general_purpose::STANDARD.encode(&buf);
    res
}

#[wasm_bindgen]
pub fn invert(base_string:&str,f:&str) -> String {
    let mut img = img_from_base(base_string);

    imageops::invert(&mut img);
    let buf = vec![];
    encode_with_extension(&mut img, buf, f)
}


#[wasm_bindgen]
pub fn resize(base_string:&str,width:u32,height:u32,f:&str) -> String {
    let img = img_from_base(base_string);
    let resized = imageops::resize(&img, width,height,imageops::FilterType::Triangle);
    let mut buf = vec![];
    match f {
        "jpg" => resized.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Jpeg(100)).unwrap(),
        "png" => resized.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Png).unwrap(),
        "bmp" => resized.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Bmp).unwrap(),
        _ => {
            return "Error".to_string();
        }
    }
    let res = general_purpose::STANDARD.encode(&buf);
    res
}






