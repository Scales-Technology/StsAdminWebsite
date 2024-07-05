
// import React, { useState } from 'react'
// import "./AddProducts.css"
// import { db, storage } from '../../../Database/config';


// export default function AddProduct() {
//     const [productname, setProductName] = useState("");
//     const [productImages, setProductImages] = useState([]);
//     const [shortdescription, setShortDescription ] = useState("");
//     const [shortdescriptionh1, setShortDescriptionh1 ] = useState("");
//     const [shortdescriptionc1, setShortDescriptionc1 ] = useState("");
//     const [shortdescriptionh2, setShortDescriptionh2 ] = useState("");
//     const [shortdescriptionc2, setShortDescriptionc2 ] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//     const [model, setmodel] = useState("");
//     const [weighrange, setweighrange] = useState("");
//     const [minweighcapacity, setminweighcapacity] = useState("");
//     const [maxweighcapacity, setmaxweighcapacity] = useState("");
//     const [powersupply, setpowersupply] = useState("")
//     const [batteryestiamtedusetime, setbatteryestiamtedusetime] = useState("")
//     const [powerconsumption, setpowerconsumption] = useState("");
//     const [lcdbacklight, setlcdbacklight] = useState("");
//     const [dimensions, setdimensions] = useState("");
//     const [brand, setbrand] = useState("");

//     const categories = [
//         { id: 1, name: 'WeighBridge', subcategories: ['Axle', 'Concrete', 'Steel'] },
//         { id: 2, name: 'Retail Scale', subcategories: ['Price Computing', 'Cash Register', 'Label Printing'] },
//         { id: 3, name: 'Industrial Scale', subcategories: ['Platform Scales', 'Floor Scales', 'Hanging Scales', 'Weighing Tanks', 'Pallet truck & scales', 'Animal Scales', 'Monorail Scales', 'Analytical Scales'] },
//         { id: 4, name: 'Medical Scales', subcategories: [] },
//         { id: 5, name: 'Spares & Accessories', subcategories: ['Load Cells', 'Indicators', 'Cables', 'Leveling Test', 'Batteries', 'Chargers'] },
//         { id: 6, name: 'Softwares', subcategories: ['Retail Softwares', 'Weighbridge Softwares'] },
//         { id: 7, name: 'POS Hardware', subcategories: ['Terminals', 'Printers', 'Scanners', 'Cash drawers', 'Thermal rolls', 'Thermal labels'] },
//         { id: 8, name: 'Counter Scales', subcategories:[]},
//         { id: 9, name: 'Analytical Scales', subcategories:[]},
//         { id: 10, name: 'Business Automation', subcategories:['Field Collection System']},
//       ];
//       const handleCategoryChange = (event) => {
//         const selectedCategoryId = parseInt(event.target.value);
//         const selectedCategory = categories.find(category => category.id === selectedCategoryId);
//         setSelectedCategory(selectedCategory);
//         setSelectedSubcategory(null);
//       };
    
//       const handleSubcategoryChange = (event) => {
//         const selectedSubcategory = event.target.value;
//         setSelectedSubcategory(selectedSubcategory);
//       };

//       const handleImageChange = (e) => {
//         e.preventDefault();
//         const files = Array.from(e.target.files);
//         setProductImages((prevImages) => [...prevImages, ...files]);
//     };


//     const handleSubmit = (e) => {
//       e.preventDefault();
//       if (!productname || !shortdescription || !shortdescriptionh1 || !shortdescriptionc1 || !shortdescriptionh2 || !shortdescriptionc2
//           || !model || !selectedCategory || !weighrange ||
//           !minweighcapacity || !maxweighcapacity || !powersupply || !batteryestiamtedusetime
//           || !powerconsumption || !lcdbacklight || !dimensions || !brand) {
//           alert("Please fill all the fields");
//           return;
//       }

//       const serialNumber = Math.floor(100000 + Math.random() * 9000).toString();

//       if (productImages.length > 0) {
//           const uploadPromises = productImages.map((image, index) => {
//               const imageSerial = `${serialNumber}_${index}`;
//               const uploadTask = storage.ref("ProductImage").child(imageSerial).put(image);
//               return new Promise((resolve, reject) => {
//                   uploadTask.on(
//                       "state_changed",
//                       (snapshot) => {
//                           let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//                           console.log(progress);
//                       },
//                       (err) => {
//                           console.log(err);
//                           reject(err);
//                       },
//                       () => {
//                           storage.ref("ProductImage").child(imageSerial).getDownloadURL().then((imageUrl) => {
//                               resolve(imageUrl);
//                           });
//                       }
//                   );
//               });
//           });

//           Promise.all(uploadPromises)
//               .then((imageUrls) => {
//                   db.collection("Products").add({
//                       ProductName: productname,
//                       ShortDescription: shortdescription,
//                       ShortDescriptionh1: shortdescriptionh1,
//                       ShortDescriptionc1: shortdescriptionc1,
//                       ShortDescriptionh2: shortdescriptionh2,
//                       ShortDescriptionc2: shortdescriptionc2,
//                       MainCategory: selectedCategory,
//                       productImages: imageUrls,
//                       SubCategory: selectedSubcategory,
//                       brand: brand,
//                       model: model,
//                       weighrange: weighrange,
//                       minweighcapacity: minweighcapacity,
//                       maxweighcapacity: maxweighcapacity,
//                       powersupply: powersupply,
//                       batteryestiamtedusetime: batteryestiamtedusetime,
//                       powerconsumption: powerconsumption,
//                       lcdbacklight: lcdbacklight,
//                       dimensions: dimensions,
//                   })

//                   alert('Upload Successful');

//                   //reset
//                   setSelectedCategory(null);
//                   setProductImages([]);
//                   setSelectedSubcategory(null);
//                   setProductName("");
//                   setbatteryestiamtedusetime("");
//                   setbrand("");
//                   setdimensions("");
//                   setlcdbacklight("");
//                   setmaxweighcapacity("");
//                   setminweighcapacity("");
//                   setmodel("");
//                   setpowerconsumption("");
//                   setpowersupply("");
//                   setweighrange("");
//               })
//               .catch((err) => {
//                   console.error("Error uploading images: ", err);
//               });
//       } else {
//           alert("Please select at least one image");
//       }
//   }


//   return (
//     <div className='container'>
//         <h1>Add Product</h1>
//         <form className='forms'>
//         <input className='input' placeholder='Product Name' value={productname}  onChange={(e)=> setProductName(e.target.value)}/>
//         <input className='input' type='file' placeholder='image' multiple onChange={handleImageChange} />
//         <textarea className='input' placeholder='Product Short Description' value={shortdescription}  onChange={(e)=> setShortDescription(e.target.value)}/>
//         <textarea className='input' placeholder='Product Short Description Header 1' value={shortdescriptionh1}  onChange={(e)=> setShortDescriptionh1(e.target.value)}/>
//         <textarea className='input' placeholder='Product Short Description content 1' value={shortdescriptionc1}  onChange={(e)=> setShortDescriptionc1(e.target.value)}/>
//         <textarea className='input' placeholder='Product Short Description Header 2' value={shortdescriptionh2}  onChange={(e)=> setShortDescriptionh2(e.target.value)}/>
//         <textarea className='input' placeholder='Product Short Description content2' value={shortdescriptionc2}  onChange={(e)=> setShortDescriptionc2(e.target.value)}/>
//         <textarea className='input' placeholder='Product Model' value={model}  onChange={(e)=> setmodel(e.target.value)}/>
//         <textarea className='input' placeholder='Product Weigh Range' value={weighrange}  onChange={(e)=> setweighrange(e.target.value)}/>
//         <textarea className='input' placeholder='Product Weigh Capacity(Min)' value={minweighcapacity}  onChange={(e)=> setminweighcapacity(e.target.value)}/>
//         <textarea className='input' placeholder='Product Weigh Capacity(Max)' value={maxweighcapacity}  onChange={(e)=> setmaxweighcapacity(e.target.value)}/>
//         <textarea className='input' placeholder='Product Power Supply' value={powersupply}  onChange={(e)=> setpowersupply(e.target.value)}/>
//         <textarea className='input' placeholder='Product Battery Estimated USe Time' value={batteryestiamtedusetime}  onChange={(e)=> setbatteryestiamtedusetime(e.target.value)}/>
//         <textarea className='input' placeholder='Product Power Consumption' value={powerconsumption}  onChange={(e)=> setpowerconsumption(e.target.value)}/>
//         <textarea className='input' placeholder='Product LCD Backlight' value={lcdbacklight}  onChange={(e)=> setlcdbacklight(e.target.value)}/>
//         <textarea className='input' placeholder='Product Dimensions' value={dimensions}  onChange={(e)=> setdimensions(e.target.value)}/>
//         <select className='input' value={brand}  onChange={(e)=> setbrand(e.target.value)}>
//             <option value="">Select Manufucturer</option>
//             <option>Aclas</option>
//             <option>Zemic</option>
//             <option>T-Scale</option>
//             <option>Esit</option>
//             <option>Akeli</option>
//             <option>Want</option>
//             <option>ScalesTech</option>
//         </select>
//         <select className='input' id="category" onChange={handleCategoryChange} value={selectedCategory ? selectedCategory.id : ''}>
//         <option value="">Select Main Category</option>
//         {categories.map(category => (
//           <option key={category.id} value={category.id}>{category.name}</option>
//         ))}
//       </select>
//       {selectedCategory && selectedCategory.subcategories.length > 0 && (
//         <div>
//           <label htmlFor="subcategory">Select Subcategory:</label>
//           <select className='input' id="subcategory" onChange={handleSubcategoryChange} value={selectedSubcategory || ''}>
//             <option value="">Select</option>
//             {selectedCategory.subcategories.map(subcategory => (
//               <option key={subcategory} value={subcategory}>{subcategory}</option>
//             ))}
//           </select>
//         </div>
//       )}

//         <button onClick={handleSubmit}  className='submitbutton'>Submit</button>
//         </form>
//     </div>
//   )
// }

import React, { useState } from 'react';
import './AddProducts.css';
import { db, storage } from '../../../Database/config';

export default function AddProduct() {
    const [productname, setProductName] = useState("");
    const [productImage, setProductImage] = useState([]);
    const [shortdescription, setShortDescription] = useState("");
    const [shortdescriptionh1, setShortDescriptionh1] = useState("");
    const [shortdescriptionc1, setShortDescriptionc1] = useState("");
    const [shortdescriptionh2, setShortDescriptionh2] = useState("");
    const [shortdescriptionc2, setShortDescriptionc2] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [model, setModel] = useState("");
    const [weighrange, setWeighRange] = useState("");
    const [minweighcapacity, setMinWeighCapacity] = useState("");
    const [maxweighcapacity, setMaxWeighCapacity] = useState("");
    const [powersupply, setPowerSupply] = useState("");
    const [batteryestimatedusetime, setBatteryEstimatedUseTime] = useState("");
    const [powerconsumption, setPowerConsumption] = useState("");
    const [lcdbacklight, setLcdBacklight] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [brand, setBrand] = useState("");

    const categories = [
        { id: 1, name: 'WeighBridge', subcategories: ['Axle', 'Concrete', 'Steel'] },
        { id: 2, name: 'Retail Scale', subcategories: ['Price Computing', 'Cash Register', 'Label Printing'] },
        { id: 3, name: 'Industrial Scale', subcategories: ['Platform Scales', 'Floor Scales', 'Hanging Scales', 'Weighing Tanks', 'Pallet truck & scales', 'Animal Scales', 'Monorail Scales', 'Analytical Scales'] },
        { id: 4, name: 'Medical Scales', subcategories: [] },
        { id: 5, name: 'Spares & Accessories', subcategories: ['Load Cells', 'Indicators', 'Cables', 'Leveling Test', 'Batteries', 'Chargers'] },
        { id: 6, name: 'Softwares', subcategories: ['Retail Softwares', 'Weighbridge Softwares'] },
        { id: 7, name: 'POS Hardware', subcategories: ['Terminals', 'Printers', 'Scanners', 'Cash drawers', 'Thermal rolls', 'Thermal labels'] },
        { id: 8, name: 'Counter Scales', subcategories: [] },
        { id: 9, name: 'Analytical Scales', subcategories: [] },
        { id: 10, name: 'Business Automation', subcategories: ['Field Collection System'] },
    ];

    const handleCategoryChange = (event) => {
        const selectedCategoryId = parseInt(event.target.value);
        const selectedCategory = categories.find(category => category.id === selectedCategoryId);
        setSelectedCategory(selectedCategory);
        setSelectedSubcategory(null);
    };

    const handleSubcategoryChange = (event) => {
        const selectedSubcategory = event.target.value;
        setSelectedSubcategory(selectedSubcategory);
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        setProductImage((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!productname || !shortdescription || !shortdescriptionh1 || !shortdescriptionc1 || !shortdescriptionh2 || !shortdescriptionc2
            || !model || !selectedCategory || !weighrange ||
            !minweighcapacity || !maxweighcapacity || !powersupply || !batteryestimatedusetime
            || !powerconsumption || !lcdbacklight || !dimensions || !brand || productImage.length === 0) {
            alert("Please fill all the fields and select at least one image");
            return;
        }

        const serialNumber = Math.floor(100000 + Math.random() * 9000).toString();

        const uploadPromises = productImage.map((image, index) => {
            const imageSerial = `${serialNumber}_${index}`;
            const uploadTask = storage.ref("ProductImage").child(imageSerial).put(image);
            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        console.log(progress);
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    },
                    () => {
                        storage.ref("ProductImage").child(imageSerial).getDownloadURL().then((imageUrl) => {
                            resolve(imageUrl);
                        });
                    }
                );
            });
        });

        Promise.all(uploadPromises)
            .then((imageUrls) => {
                db.collection("Products").add({
                    ProductName: productname,
                    ShortDescription: shortdescription,
                    ShortDescriptionh1: shortdescriptionh1,
                    ShortDescriptionc1: shortdescriptionc1,
                    ShortDescriptionh2: shortdescriptionh2,
                    ShortDescriptionc2: shortdescriptionc2,
                    MainCategory: selectedCategory,
                    productImage: imageUrls,
                    SubCategory: selectedSubcategory,
                    brand: brand,
                    model: model,
                    weighrange: weighrange,
                    minweighcapacity: minweighcapacity,
                    maxweighcapacity: maxweighcapacity,
                    powersupply: powersupply,
                    batteryestimatedusetime: batteryestimatedusetime,
                    powerconsumption: powerconsumption,
                    lcdbacklight: lcdbacklight,
                    dimensions: dimensions,
                });

                alert('Upload Successful');

                //reset
                setProductName("");
                setProductImage([]);
                setShortDescription("");
                setShortDescriptionh1("");
                setShortDescriptionc1("");
                setShortDescriptionh2("");
                setShortDescriptionc2("");
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setModel("");
                setWeighRange("");
                setMinWeighCapacity("");
                setMaxWeighCapacity("");
                setPowerSupply("");
                setBatteryEstimatedUseTime("");
                setPowerConsumption("");
                setLcdBacklight("");
                setDimensions("");
                setBrand("");
            })
            .catch((err) => {
                console.error("Error uploading images: ", err);
            });
    };

    return (
        <div className='container'>
            <h1>Add Product</h1>
            <form className='forms'>
                <input className='input' placeholder='Product Name' value={productname} onChange={(e) => setProductName(e.target.value)} />
                <input className='input' type='file' placeholder='image' multiple onChange={handleImageChange} />
                <textarea className='input' placeholder='Product Short Description' value={shortdescription} onChange={(e) => setShortDescription(e.target.value)} />
                <textarea className='input' placeholder='Product Short Description Header 1' value={shortdescriptionh1} onChange={(e) => setShortDescriptionh1(e.target.value)} />
                <textarea className='input' placeholder='Product Short Description content 1' value={shortdescriptionc1} onChange={(e) => setShortDescriptionc1(e.target.value)} />
                <textarea className='input' placeholder='Product Short Description Header 2' value={shortdescriptionh2} onChange={(e) => setShortDescriptionh2(e.target.value)} />
                <textarea className='input' placeholder='Product Short Description content2' value={shortdescriptionc2} onChange={(e) => setShortDescriptionc2(e.target.value)} />
                <textarea className='input' placeholder='Product Model' value={model} onChange={(e) => setModel(e.target.value)} />
                <textarea className='input' placeholder='Product Weigh Range' value={weighrange} onChange={(e) => setWeighRange(e.target.value)} />
                <textarea className='input' placeholder='Product Weigh Capacity(Min)' value={minweighcapacity} onChange={(e) => setMinWeighCapacity(e.target.value)} />
                <textarea className='input' placeholder='Product Weigh Capacity(Max)' value={maxweighcapacity} onChange={(e) => setMaxWeighCapacity(e.target.value)} />
                <textarea className='input' placeholder='Product Power Supply' value={powersupply} onChange={(e) => setPowerSupply(e.target.value)} />
                <textarea className='input' placeholder='Product Battery Estimated Use Time' value={batteryestimatedusetime} onChange={(e) => setBatteryEstimatedUseTime(e.target.value)} />
                <textarea className='input' placeholder='Product Power Consumption' value={powerconsumption} onChange={(e) => setPowerConsumption(e.target.value)} />
                <textarea className='input' placeholder='Product LCD Backlight' value={lcdbacklight} onChange={(e) => setLcdBacklight(e.target.value)} />
                <textarea className='input' placeholder='Product Dimensions' value={dimensions} onChange={(e) => setDimensions(e.target.value)} />
                <select className='input' value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="">Select Manufacturer</option>
                    <option>Aclas</option>
                    <option>Zemic</option>
                    <option>T-Scale</option>
                    <option>Esit</option>
                    <option>Akeli</option>
                    <option>Want</option>
                    <option>ScalesTech</option>
                </select>
                <select className='input' id="category" onChange={handleCategoryChange} value={selectedCategory ? selectedCategory.id : ''}>
                    <option value="">Select Main Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {selectedCategory && selectedCategory.subcategories.length > 0 && (
                    <div>
                        <label htmlFor="subcategory">Select Subcategory:</label>
                        <select className='input' id="subcategory" onChange={handleSubcategoryChange} value={selectedSubcategory || ''}>
                            <option value="">Select</option>
                            {selectedCategory.subcategories.map(subcategory => (
                                <option key={subcategory} value={subcategory}>{subcategory}</option>
                            ))}
                        </select>
                    </div>
                )}

                <button onClick={handleSubmit} className='submitbutton'>Submit</button>
            </form>
        </div>
    );
}
