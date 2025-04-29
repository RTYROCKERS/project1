import React, { useState, useEffect } from "react";
import "../styles/ScrapDetails.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { jwtDecode } from "jwt-decode";
import Image from "../assets/scrap-detail-image.jpeg";
import Navbar from "../components/Navbar";

function ScrapDetails() {
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token"); 
    if (token) {
      const decoded = jwtDecode(token); 

      return decoded._id; 
    }
    return null; 
  };
  const userId = getUserIdFromToken(); 
  console.log("Logged-in user ID:", userId);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userType, setUserType] = useState("");
  const [products, setProducts] = useState("");
  
  const [orderDetails, setOrderDetails] = useState({
    imageUrl: "",
    user: userId,
    name: "",
    price: "",
    category:"plastic",
    preferredDate: "",
    preferredTime: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setUserType(localStorage.getItem("userType"));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyOrderDetails = { ...orderDetails };
    copyOrderDetails[name] = value;
    setOrderDetails(copyOrderDetails);
  };
  const handleChange_file=(e)=>{
    const file=e.target.files[0];
    if(file){
      const reader=new FileReader();
      reader.onloadend = () => {
        // Update the state with the image preview URL
        setOrderDetails({
          ...orderDetails,
          imageUrl: reader.result, // This will contain the base64 image data URL
        });}
        reader.readAsDataURL(file);
    }

  }
 
  const upload = async (event) => {
    event.preventDefault();

    const { imageUrl, user, name, price,category, preferredDate, preferredTime } =
      orderDetails;
    orderDetails.user = userId;
    if (
      !name ||
      !user ||
      !imageUrl ||
      !price ||
      !category||
      !preferredDate ||
      !preferredTime
    ) {
      console.log(category);
      return handleError("all fields required....");
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        }
      );
      console.log(orderDetails);

      const result = await response.json();
      if (response.ok) {
        handleSuccess("Scrap uploaded");
        setOrderDetails({
          imageUrl: "",
          user: userId,
          name: "",
          price: "",
          category:"",
          preferredDate: "",
          preferredTime: "",
        });
        console.log("Order Created:", result);
      } else {
        console.error("Failed to create order:", result.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="sell-container">
        <div className="sell-form-wrapper">
          <form onSubmit={upload}>
            <div className="sell-form-inner">
              <label htmlFor="name" className="sell-form-label">
                Scrap Name
              </label>
              <input
                onChange={handleChange}
                type="name"
                name="name"
                placeholder="Enter scrap name..."
                value={orderDetails.name}
                className="sell-form-input"
              />
            </div>
            <div className="sell-form-inner">
              <label htmlFor="price" className="sell-form-label">
                Desired price:
              </label>
              <input
                onChange={handleChange}
                type="price"
                name="price"
                placeholder="Enter your selling price..."
                value={orderDetails.price}
                className="sell-form-input"
              />
            </div>
            <div className="sell-form-inner">
            <label htmlFor="price" className="sell-form-label">
              Category:
            </label>
            <select 
              name="category" 
              // Bind the value to the state category
              onChange={handleChange}
            >
              <option value="plastic">PLASTIC</option>
              <option value="metallic">METALLICS</option>
              <option value="electronic">E-WASTE</option>
              <option value="paper">PAPER</option>
              <option value="glass">GLASS</option>
              <option value="others">OTHERS</option>
            </select>
            </div>
            <div className="sell-form-inner">
              <label htmlFor="url" className="sell-form-label">
                Enter the url of scrap:
              </label>
              <input
                onChange={handleChange_file}
                type="file"
                accept="image/*"
                name="imageUrl"
                placeholder="paste your image url..."
                //value={orderDetails.imageUrl}
                className="sell-form-input"
              />
              {orderDetails.imageUrl && (
                <div>
                  <h3>Image Preview:</h3>
                  <img src={orderDetails.image} alt="Image Preview" width="200" />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="preferredDate">Preferred Date</label>
              <input
                onChange={handleChange}
                type="date"
                name="preferredDate"
                value={orderDetails.preferredDate}
                className="sell-form-input"
              />
            </div>
            <div>
              <label htmlFor="preferredTime">Preferred Time</label>
              <input
                onChange={handleChange}
                type="time"
                name="preferredTime"
                value={orderDetails.preferredTime}
                className="sell-form-input"
              />
            </div>
            <button className="upload-btn" type="submit">
              SELL
            </button>
          </form>
        </div>
        <ToastContainer />
        <img class="sell-image" src={Image} alt="Eco-friendly illustration" />
      </div>
      <div className="divider">OR</div>
      <div className="container">
        <p className="block_title">Normal Recyclables</p>
        <section className="types-of-scrap">
          <div className="flex flex-wrap item_block_web">
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/16995/16995162.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Office Paper <br /> Rs 14/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/16995/16995162.png",
                      name: "Office Paper",
                      price: "14",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/7152/7152601.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Newspaper <br /> Rs 14/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/7152/7152601.png",
                      name: "Newspaper",
                      price: "14",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://ikp.edgekit.net/h1rxzpffx/swapecox/Books.webp"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Coppies/Books <br /> Rs 12/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://ikp.edgekit.net/h1rxzpffx/swapecox/Books.webp",
                      name: "Coppies/Books",
                      price: "12",
                    });
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/685/685388.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Cardboard <br /> Rs 8/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/685/685388.png",
                      name: "Cardboard",
                      price: "8",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2666/2666751.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Plastic(Ex Bolltles) <br /> Rs 8/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/2666/2666751.png",
                      name: "Plastic(Ex Bottles)",
                      price: "8",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
          </div>
        </section>
        <p className="block_title">Metallic Appliances</p>
        <section className="types-of-scrap">
          <div className="flex flex-wrap item_block_web">
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/8654/8654449.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Iron <br /> Rs 26/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/8654/8654449.png",
                      name: "Iron",
                      price: "26",
                    });
                    setTimeout(() => upload(event), 500);
                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5672/5672081.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Steel Materials <br /> Rs 40/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/5672/5672081.png",
                      name: "Steel Materials",
                      price: "40",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/12647/12647961.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Aluminium <br /> Rs 110/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/12647/12647961.png",
                      name: "Aluminium",
                      price: "110",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/11312/11312310.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Brass <br /> Rs 310/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/11312/11312310.png",
                      name: "Brass",
                      price: "310",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/8235/8235491.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Copper <br /> Rs 425/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/8235/8235491.png",
                      name: "Copper",
                      price: "425",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
          </div>
        </section>
        <p className="block_title">Large Appliances</p>
        <section className="types-of-scrap">
          <div className="flex flex-wrap item_block_web">
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14418/14418033.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Split Ac <br /> Copper Coil <br /> 1.5TON(INDOOR+OUTDOOR){" "}
                  <br /> Rs 4400/piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/14418/14418033.png",
                      name: "Split AC(1.5TON)",
                      price: "4400",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/8988/8988865.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Window AC <br /> 1.5TON (Copper Coil) <br /> Rs 4100/piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/8988/8988865.png",
                      name: "Window AC(1.5TON)",
                      price: "4100",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14289/14289424.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Front Load <br /> Fully Automatic <br /> Washing Machine{" "}
                  <br /> 1500/piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/14289/14289424.png",
                      name: "Washing Machine",
                      price: "1500",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/8078/8078936.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Fridge <br /> 1100/piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/8078/8078936.png",
                      name: "Single door Fridge",
                      price: "1100",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
          </div>
        </section>
        <p className="block_title">Small Appliances</p>
        <section className="types-of-scrap">
          <div className="flex flex-wrap item_block_web">
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1041/1041985.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Printer/scanner/fax machine <br /> 20/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/1041/1041985.png",
                      name: "Printer/scanner/fax machine",
                      price: "20",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2337/2337999.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Ceiling Fan <br /> 40/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/2337/2337999.png",
                      name: "Ceiling Fan",
                      price: "40",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2329/2329273.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  CRT TV <br /> 200/Piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/2329/2329273.png",
                      name: "CRT TV",
                      price: "200",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3713/3713201.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Battery <br /> 81/Kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/2329/2329273.png",
                      name: "Battery",
                      price: "81",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
          </div>
        </section>
        <p className="block_title">Mobiles & Computers</p>
        <section className="types-of-scrap">
          <div className="flex flex-wrap item_block_web">
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2704/2704414.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Scrap Laptop <br /> Rs 300/Piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/2704/2704414.png",
                      name: "Scrap Laptop",
                      price: "300",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/7733/7733346.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  LED/LCD TV <br /> Rs 500/Piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/7733/7733346.png",
                      name: "LED/LCD TV",
                      price: "500",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2933/2933245.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  LCD Monitor <br /> Rs 20/kg
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/2933/2933245.png",
                      name: "LCD Monitor",
                      price: "20",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5752/5752706.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Computer CPU <br /> Rs 200/Piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/5752/5752706.png",
                      name: "Computer CPU",
                      price: "200",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
          </div>
        </section>
        <p className="block_title">Other</p>
        <section className="types-of-scrap">
          <div className="flex flex-wrap item_block_web">
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1048/1048334.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Bike <br /> Rs 2100/Piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/1048/1048334.png",
                      name: "Bike",
                      price: "2100",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="card box_outside">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3097/3097180.png"
                className="card-img-scrapdetail"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  Car <br /> Rs 20000/Piece
                </p>
                <button
                  className="btn btn-success"
                  onClick={(event) => {
                    setOrderDetails({
                      ...orderDetails,
                      imageUrl:
                        "https://cdn-icons-png.flaticon.com/128/3097/3097180.png",
                      name: "Car",
                      price: "20000",
                    });

                    
                  }}
                >
                  {" "}
                  UPLOAD
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ScrapDetails;
