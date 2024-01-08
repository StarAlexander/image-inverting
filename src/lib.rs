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
pub fn invert(base_string:&str,f:&str) -> String {
    let mut img = img_from_base(base_string);

    imageops::invert(&mut img);
    let mut buf = vec![];
    match f {
        "jpg" => img.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Jpeg(100)).unwrap(),
        "png" => img.write_to(&mut Cursor::new(&mut buf), image::ImageOutputFormat::Png).unwrap(),
        _ => {
            return "Error".to_string();
        }
    }
    let res = general_purpose::STANDARD.encode(&buf);
    res
}






