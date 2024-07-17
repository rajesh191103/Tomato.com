import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);


const url = "http://localhost:4000"

const StoreContextProvider = (props) => {

  const url = "http://localhost:4000"
  const [token,setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [food_list,setFoodList] = useState([])



  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // useEffect(()=>{
  //     console.log(cartItems)
  // },[cartItems])

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }


  useEffect(()=>{
      

      async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"))
        }
      }

      loadData();
  },[])//here we check if token is exist in local stoarge if yes then we store in setToken 
  //here basically we are doing for after relod we will be in login state not logout state 

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
