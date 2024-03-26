'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";

import {data} from "autoprefixer";
import onRecoverableError from "next/dist/client/on-recoverable-error";
export default function Home() {

    const [recipeinfo, setRecipeInfo] = useState({
        title : "",
        servings : 0,
        ingredients : [],
        instructions : ""
    })
    const [result, setResult] = useState({})
    const onChange = (e) => {
        setRecipeInfo({ ...recipeinfo, [e.target.name]: e.target.value });
    };

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    const postData = async (title, servings, ingredients, instructions) => {
        console.log(title, servings, ingredients, instructions)
        try {
            let response = await axios.post(`https://api.spoonacular.com/recipes/analyze?apiKey=${API_KEY}&includeNutrition=true`, {
                title: title,
                servings: servings,
                ingredients: ingredients,
                instructions: instructions
            });
            return response;
        } catch (error) {
            console.error('Error posting data to Spoonacular:', error);
            return null;
        }
    };

    useEffect(() => {
    })
    const onSubmit = async () => {
        const ingredients = recipeinfo.ingredients.length > 0 ? recipeinfo.ingredients.split('\n') : [];
        let { title, servings, instructions } = recipeinfo;
        if(title !== null && title !==''){
            let response = await postData(title, parseInt(servings), ingredients, instructions)
            setResult(response.data)
        }else {
            setRecipeInfo({
                title : "",
                servings : 0,
                ingredients : [],
                instructions : ""
            });
            setResult("");
            toast('Please input Title', { hideProgressBar: true, autoClose: 2000, type: 'warning' })
        }
    }
    return (
      <div className="min-h-screen bg-white grid grid-cols-2 px-12 py-20 gap-4">
        <div className="text-center px-12 bg-gray-50 py-8">
            <div className="mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2 justify-items-start flex">
                    Title
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title" type="text" placeholder="titile" name="title"
                    onChange={onChange}/>
            </div>

            <div className="mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2 justify-items-start flex">
                    Servings
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title" type="text" placeholder="servings" name="servings"
                    onChange={onChange}/>
            </div>

            <div className="mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2 justify-items-start flex">
                    Ingredients
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="ingredients" placeholder="ingredients" rows="8" name="ingredients"
                    onChange={onChange}/>
            </div>

            <div className="mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2 justify-items-start flex">
                    Instructions
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="instructions" placeholder="instructions" rows="8" name="instructions"
                    onChange={onChange}/>
            </div>
            <div className="mb-4">
                <button
                    onClick={onSubmit}
                    type="button"
                    className="bg-green-400 text-white px-4 py-2 rounded w-full">
                    Submit
                </button>
            </div>

        </div>
          <div className="text-center px-12 bg-gray-50 py-8">
              <textarea
                  className="shadow appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="instructions" placeholder="Result" name="result" value={JSON.stringify(result, null, 2).length==2 ? "" : JSON.stringify(result, null, 2) }
                  style={{ whiteSpace: 'pre'}}/>
          </div>
          <ToastContainer />
    </div>
    )
}
