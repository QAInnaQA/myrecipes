import { useEffect, useState } from 'react';
import './App.css';
import video from "./video.mp4"
import MyRecipesComponents from './MyRecipesComponents';

function App() {

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("avocado");

  const APP_ENDPOINT = 'https://api.edamam.com/api/recipes/v2';
  const APP_ID = '8ab7a4c3';
  const APP_KEY = 'f14bb474657c53b972835d902e6c962a'

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`${APP_ENDPOINT}?type=public&q=${wordSubmitted}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setMyRecipes(data.hits);
    }
    getRecipe()
  }, [wordSubmitted])

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
    console.log(e.target.value)
  }

  const finalSearch = (e) => {
    e.preventDefault()
    setWordSubmitted(mySearch)
  }

  return (
    <div className="App">
      <div className='container'> 
      <video autoPlay muted loop>
      <source src={video} type='video/mp4'/>
      </video>
      <h1>Find a Recipe</h1>
      </div>

      <div className='container'>
        <form onSubmit={finalSearch}>
          <input className='search' placeholder='search...' onChange={myRecipeSearch} value={mySearch}></input>
        </form>
      </div>

      <div className='container'>
        <button onClick={finalSearch}>
          <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt='icon'/>
        </button>
      </div>
    
    {myRecipes.map((element, index) => (
      <MyRecipesComponents key={index}
      label={element.recipe.label} 
      image={element.recipe.image} 
      calories={element.recipe.calories}
      ingredients={element.recipe.ingredientLines}/>
    ))}
    </div>
  );
}

export default App;
