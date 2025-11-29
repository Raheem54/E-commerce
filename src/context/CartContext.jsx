import axios from "axios";
import { createContext} from "react";

export let Cartcontext= createContext()
function addtocart(product) {
    return axios.post("http://localhost:3000/cart",{...product,count:1}).then((res)=>res).catch((err)=>err)
}
function getcart() {
    return axios.get("http://localhost:3000/cart").then((res)=>res).catch((err)=>err)
}
function deletecart(id) {
    return axios.delete(`http://localhost:3000/cart/${id}`).then((res)=>res).catch((err)=>err)
}
function updatecart(id,count) {
    return axios.patch(`http://localhost:3000/cart/${id}`,{
        "count":count
    }).then((res)=>res).catch((err)=>err)
}
async function clearcart() {
    let res=await getcart()
    const deletePromises=res.data.map((ele)=>{
        deletecart(ele.id)
    })
    await Promise.all(deletePromises);
}

export default function CartContextProvider(props) {
    return <Cartcontext.Provider value={{addtocart,getcart,deletecart,updatecart,clearcart}}>
        {props.children}
    </Cartcontext.Provider>
}