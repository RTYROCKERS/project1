import React,{useState,useEffect}from 'react'
import '../styles/ScrapDetails.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import {jwtDecode} from 'jwt-decode';

function ScrapDetails() {
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");  // Retrieve the JWT token from localStorage
    if (token) {
      const decoded = jwtDecode(token);  // Decode the JWT token
    //   console.log(decoded);
      return decoded._id;  // Assuming the user's ID is stored as 'user_id' in the payload
    }
    return null;  // Return null if no token exists
  }
const userId = getUserIdFromToken();  // Get the user ID from the token
console.log('Logged-in user ID:', userId);
const [loggedInUser, setLoggedInUser] = useState('');
const [userType, setUserType] = useState('');
const [products, setProducts] = useState('');
const [orderDetails,setOrderDetails]=useState({
    imageUrl: "",
    user:userId, // Include userId in the request          
    name: "",
    price: "",
  });
const navigate = useNavigate();
useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    setUserType(localStorage.getItem('userType'));
}, [])
const handleChange = (e) => {
    const { name, value } = e.target;
    const copyOrderDetails = { ...orderDetails };
    copyOrderDetails[name] = value;
    setOrderDetails(copyOrderDetails);
};


const upload = async (event) => {
  event.preventDefault();
      
  const {imageUrl,user,name,price}=orderDetails;
  orderDetails.user=userId;
  if (!name || !user|| !imageUrl|| !price) {
      return handleError('all fields required....')
  }
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });

    const result = await response.json();
    if (response.ok) {
      handleSuccess("Scrap uploaded");
      setOrderDetails({
          imageUrl: "",
          user: userId, // Keep the userId as it is
          name: "",
          price: "",
      });
      console.log('Order Created:', result);
    } else {
      console.error('Failed to create order:', result.message);
    }
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

  return (
    <>
    <div className='sell-container'>
    <form onSubmit={upload}>
      <div className='sell-form-inner'>
        <label htmlFor='name' className='sell-form-label'>Scrap Name</label>
        <input
            onChange={handleChange}
            type='name'
            name='name'
            placeholder='Enter scrap name...'
            value={orderDetails.name}
            className='sell-form-input'
        />
      </div>
      <div className='sell-form-inner'>
        <label htmlFor='price' className='sell-form-label'>Desired price:</label>
        <input
            onChange={handleChange}
            type='price'
            name='price'
            placeholder='Enter your selling price...'
            value={orderDetails.price}
            className='sell-form-input'
        />
      </div>
      <div className='sell-form-inner' >
        <label htmlFor='url' className='sell-form-label'>Enter the url of scrap:</label>
        <input
            onChange={handleChange}
            type='imageUrl'
            name='imageUrl'
            placeholder='paste your image url...'
            value={orderDetails.imageUrl}
            className='sell-form-input'
        />
      </div>
      <button type='submit'>Upload</button>
    </form>
    <ToastContainer />
    </div>
    <div className="divider">OR</div>
    <div className='container'>
      <p className='block_title'>Normal Recyclables</p>
      <section className='types-of-scrap'>
      <div className="flex flex-wrap item_block_web">
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/16995/16995162.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Office Paper <br/> Rs 14/kg</p>
            <button onClick={(event) => {
             setOrderDetails({
              ...orderDetails,
              imageUrl: "https://cdn-icons-png.flaticon.com/128/16995/16995162.png",
              name: "Office Paper",
              price: "14",
          });
          setTimeout(() => upload(event), 500);
           // Call upload function after setting state
      }
            }> ADD TO CART

            </button>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/7152/7152601.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Newspaper <br/> Rs 14/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://ikp.edgekit.net/h1rxzpffx/swapecox/Books.webp" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Coppies/Books <br/> Rs 12/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/685/685388.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Cardboard <br/> Rs 8/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/2666/2666751.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Plastic(Ex Bolltles) <br/> Rs 8/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
      </div>
      </section>
      <p className='block_title'>Metallic Appliances</p>
      <section className='types-of-scrap'>
      <div className="flex flex-wrap item_block_web">
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/8654/8654449.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Iron <br /> Rs 26/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/5672/5672081.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Steel Materials <br /> Rs 40/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/12647/12647961.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Aluminium <br /> Rs 110/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/11312/11312310.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Brass <br /> Rs 310/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/8235/8235491.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Copper <br /> Rs 425/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
      </div>
      </section>
      <p className='block_title'>Large Appliances</p>
      <section className='types-of-scrap'>
      <div className="flex flex-wrap item_block_web">
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/14418/14418033.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Split Ac <br /> Copper Coil <br /> 1.5TON(INDOOR+OUTDOOR) <br /> Rs 4400/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/8988/8988865.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Window AC <br /> 1.5TON (Copper Coil) <br /> Rs 4100/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/14289/14289424.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body"> 
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Front Load <br /> Fully Automatic <br /> Washing Machine <br /> RS 1500/piece</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/8078/8078936.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Fridge <br /> RS 1100/piece</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
      </div>
      </section>
      <p className='block_title'>Small Appliances</p>
      <section className='types-of-scrap'>
      <div className="flex flex-wrap item_block_web">
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/1041/1041985.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Printer/scanner/fax machine <br /> RS 20/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/2337/2337999.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Ceiling Fan <br /> RS 40/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/2329/2329273.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">CRT TV <br /> RS 200/Piece</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/3713/3713201.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Battery <br /> RS 81/Kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
      </div>
      </section>
      <p className='block_title'>Mobiles & Computers</p>
      <section className='types-of-scrap'>
      <div className="flex flex-wrap item_block_web">
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/2704/2704414.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Scrap Laptop <br /> Rs 300/Piece</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/7733/7733346.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">LED/LCD TV <br /> Rs 500/Piece</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/2933/2933245.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">LCD Monitor <br /> Rs 20/kg</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="..." className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Computer CPU <br /> Rs 200/Piece</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
      </div>
      </section>
      <p className='block_title'>Other</p>
      <section className='types-of-scrap'>
      <div className="flex flex-wrap item_block_web">
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/1048/1048334.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Bike <br /> Rs 2100/Piece</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        <div className="card box_outside" >
          <img src="https://cdn-icons-png.flaticon.com/128/3097/3097180.png" className="card-img-scrapdetail" alt="..."/>
          <div className="card-body">
            {/* <h5 className="card-title"></h5> */}
            <p className="card-text">Car <br /> Rs 20000/Piece</p>
            <a href="/" className="btn btn-success">ADD TO CART</a>
          </div>
        </div>
        
      </div>
      </section>
    </div>


    </>
    
  )
}

export default ScrapDetails
