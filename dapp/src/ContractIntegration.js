import abi from "../src/Abi/abi.json";
import { ethers } from "ethers";
import Web3 from "web3";

const COMMERCE_CONTRACT = "0x97E72c16AC4175B5E4129B6D66FD41a781dBeC8f";

const isBrowser = () => typeof window !== "undefined";
const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum); 
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}


export const GETALLPRODUCTS =async () => {
    try {
        // const provider = new ethers.providers.JsonRpcProvider(
        //     "https://sepolia.infura.io/v3/290819ba5ca344eea8990cb5ccaa8e6a"
        // );
        const provider = 
        window.ethereum != null
          ? new ethers.providers.Web3Provider(window.ethereum)
          : ethers.providers.getDefaultProvider();
    
        const signer = provider.getSigner();
        const Role = new ethers.Contract(COMMERCE_CONTRACT, abi, signer);
        const answer = await Role.getAllProducts();
        return answer;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const ADDPRODUCTS= async ({ productName, category, description, price,  downloadURLString }) => {
  try {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();

    const signer = provider.getSigner();
    const Role = new ethers.Contract(COMMERCE_CONTRACT, abi, signer);
    const tokenId = await Role.addProduct(productName, category, description, price, downloadURLString );
    alert('Product places Successfully!');
    return tokenId;
  } catch (error) {
    console.error('Error selling product:', error);
  }   
}

export const BUYPRODUCT= async ({ Product_ID }) => {
  try {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();

    const signer = provider.getSigner();
    const Role = new ethers.Contract(COMMERCE_CONTRACT, abi, signer);
    const tokenId = await Role.buyProduct( Product_ID );
    alert('Product Buyed!');
    return tokenId;
  } catch (error) {
    console.error('Error purchasing product:', error);
  }   
}
