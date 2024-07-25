"use client"
import Header from '@/components/Header'
import { useState, useEffect } from 'react'

export default function Home() {
  const [productForm, setProductForm] = useState({})
  const [products, setProducts] = useState([])
  const [alert, setAlert] = useState("")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingaction, setLoadingaction] = useState(false)
  const [dropdown, setDropdown] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product')
      let rjson = await response.json()
      setProducts(rjson.products)
    }
    fetchProducts()
  }, [])

  const buttonAction = async (action, slug, initialQuantity) => {
    let index = products.findIndex((item) => item.slug == slug)
    let newProducts = JSON.parse(JSON.stringify(products))
    if (action == "plus") {
      newProducts[index].quantity = parseInt(initialQuantity) + 1
    } else {
      newProducts[index].quantity = parseInt(initialQuantity) - 1
    }
    setProducts(newProducts)

    let indexdrop = dropdown.findIndex((item) => item.slug == slug)
    let newDropdown = JSON.parse(JSON.stringify(dropdown))
    if (action == "plus") {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1
    } else {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1
    }
    setDropdown(newDropdown)

    setLoadingaction(true)
    const response = await fetch('/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action, slug, initialQuantity })
    });
    let r = await response.json()
    setLoadingaction(false)

    if (newProducts[index]?.quantity === 0) {
      await fetch(`/api/product`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug })
      });

      setProducts(newProducts.filter(product => product.slug !== slug));
      setDropdown(newDropdown.filter(product => product.slug !== slug));
    }
  }

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productForm)
      });

      if (response.ok) {
        setAlert("Your Product has been added!");
        setProductForm({});
      } else {
        console.error('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
    const response = await fetch('/api/product');
    let rjson = await response.json();
    setProducts(rjson.products);
  }

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  }

  const onDropdownEdit = async (e) => {
    let value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch('/api/search?query=' + value);
      let rjson = await response.json();
      setDropdown(rjson.products.filter(product => product.quantity > 0));
      setLoading(false);
    } else {
      setDropdown([]);
    }
  }
  
  return (
    <>
      <Header />
      
      <div id="search" className="container mx-auto my-24 px-24">
        <div className='text-green-800'>{alert}</div>
        <h1 className="heading text-3xl font-semibold mb-6">Search a Product</h1>
        <div className="flex mb-2">
          <input onChange={onDropdownEdit} type="text" placeholder="Enter a product name" className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md rounded-r-md" />
        </div>
        {loading && <div className='flex justify-center items-center'> <img width={74} src="/loading.svg" alt="" /> </div>}
        <div className="dropcontainer absolute w-[72vw] border-1 bg-indigo-100 rounded-md ">
          {dropdown.map(item => (
            <div key={item.slug} className="container flex justify-between p-2 my-1 border-b-2 rounded-md">
              <span className="slug"> {item.slug} ({item.quantity} available ₹{item.price} each)</span>
              <div className='mx-5'>
                <button onClick={() => { buttonAction("minus", item.slug, item.quantity) }} disabled={loadingaction} className="subtract inline-block px-3 py-1 cursor-pointer bg-indigo-500 text-white font-semibold rounded-lg shadow-md disabled:bg-indigo-200"> - </button>
                <span className="quantity inline-block min-w-3 mx-3">{item.quantity}</span>
                <button onClick={() => { buttonAction("plus", item.slug, item.quantity) }} disabled={loadingaction} className="add inline-block px-3 py-1 cursor-pointer bg-indigo-500 text-white font-semibold rounded-lg shadow-md disabled:bg-indigo-200">  + </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="add" className="container mx-auto my-24 px-24">
        <h1 className="heading text-3xl font-semibold mb-6">Add a Product</h1>

        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block mb-2">Product</label>
            <input value={productForm?.slug || ""} name='slug' onChange={handleChange} type="text" id="productName" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">Quantity</label>
            <input value={productForm?.quantity || ""} name='quantity' onChange={handleChange} type="number" id="quantity" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">Price</label>
            <input value={productForm?.price || ""} name='price' onChange={handleChange} type="number" id="price" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input value={productForm?.email || ""} name='email' onChange={handleChange} type="email" id="email" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
          </div>

          <button onClick={addProduct} type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold">
            Add Product
          </button>
        </form>
      </div>
      
      <div id="display" className="container my-24 mx-auto px-24">
        <h1 className="heading text-3xl font-semibold mb-6 text-center">Products Available for Purchase</h1>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.slug} className="rounded-md">
                <td className="border px-4 py-2 rounded-md">{product.slug}</td>
                <td className="border px-4 py-2 rounded-md">{product.quantity}</td>
                <td className="border px-4 py-2 rounded-md">₹{product.price}</td>
                <td className="border px-4 py-2 rounded-md">{product.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .heading {
          font-size: 1.875rem;
        }

        @media (max-width: 575px) and (min-width: 280px) {
          .container {
            padding: 1rem;
          }
          .dropcontainer {
            width: 100%;
          }
          input[type="text"], input[type="number"], input[type="email"] {
            width: 100%;
            padding: 0.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  )
}
