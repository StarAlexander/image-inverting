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

#[wasm_bindgen]
pub fn invert(base_string:&str) -> String {
    let mut img = img_from_base(base_string);

    imageops::invert(&mut img);
    let mut buf = vec![];
    img.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Jpeg(100)).unwrap();
    let res = general_purpose::STANDARD.encode(&buf);
    res
}

#[wasm_bindgen]
pub fn resize(base_string:&str,width:u32,height:u32) -> String {
    let mut img = img_from_base(base_string);

    let img_buf = imageops::resize(&mut img,width,height, imageops::FilterType::Triangle );
    
    let mut buf = vec![];
    img_buf.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Jpeg(100)).unwrap();

    general_purpose::STANDARD.encode(&buf)
}


#[wasm_bindgen]
pub fn return_three() -> i32 {
    3
}


