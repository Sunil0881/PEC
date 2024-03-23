import React, { useEffect, useState } from 'react';
import { BUYPRODUCT, GETALLPRODUCTS } from '../ContractIntegration';



 

const Buy = () => {

    const [entries, setEntries] = useState([]);

    const handleClick = async (index ) => {
        console.log(index);
        try {
            const tokenId = await BUYPRODUCT(entries[index] );
            console.log(tokenId);
            // If the transaction is successful, you can provide feedback to the user
            alert("Purchase successful!");
        } catch (error) {
            // Handle errors
            console.error("Error purchasing product:", error.message);
            if (error.message.includes("Insufficient funds")) {
                alert("Error: Insufficient funds. Please ensure you have enough ether to cover the transaction gas fees.");
            } else {
                alert("An error occurred while purchasing the product. Please try again later.");
            }
        }
    }

    const get = async () => {
        const answer = await GETALLPRODUCTS();
        if (Array.isArray(answer)) {
            const formattedEntries = answer.map(entry => ({
                Product_ID: entry[0].toNumber(),
                Seller_Address: entry[1].toString(),
                Product_Name: entry[2],
                Category: entry[3],
                Description: entry[4],
                Price: parseInt(entry[5].toString()), // Convert BigNumber to string, then parse as integer
                Product_status: parseInt(entry[6].toString()) // Convert BigNumber to string, then parse as integer
            }));
            
            setEntries(formattedEntries);
        } else {
            console.error('Invalid answer format:', answer);
        }
        
    }
    
    useEffect(() => {
     get()
        
    }, []);
      
   
      
      
  return (
    
        <div className='bg-green-200 h-screen pt-20'>
             <div>
                <div className='pt-10 pb-10 bg-green-200  grid grid-cols-3 gap-5 px-8'>
                    {entries.map((entry, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-xl p-4 ">
                        
                        <div>Product_ID : {entry.Product_ID}</div>
                        <div>Seller_Address : {entry.Seller_Address}</div>
                        <div>Product_Name : {entry.Product_Name}</div>
                        <div>Category : {entry.Category}</div>
                        <div>Description : {entry.Description}</div>
                        <div>Price : {entry.Price}</div>
                        <div>Product_status : {entry.Product_status}</div>
                        <div className='flex justify-center '>
                        <button className='border-2 border-red-400 text-xl font-bold  px-3 py-1 bg-red-400 rounded-lg hover:bg-white hover:border-red-400 hover:text-red-600' onClick={() => handleClick(index)}>Buy</button>
                        
                        </div>
                    </div>
                    ))}
                </div>
             </div>

        </div>
  )
}

export default Buy