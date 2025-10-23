/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Fetch error:", error)
    throw error
  }
}

async function fetchAndPopulatePokemons(select) {
  try {
    const data = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=151')

    select.innerHTML = ''
    data.results.forEach((item) => {
      const option = document.createElement('option')
      option.value = item.url
      option.textContent  = item.name
      select.appendChild(option)
    })
  } catch (e) {
    console.error("Fetch error:", e)
    throw e
  }
}

async function fetchImage(url) {

  try {
    const response = await fetchData(url)

    let img = document.querySelector('#pokemon-image')

    if (!img) {
      img = document.createElement('img')
      img.id = 'pokemon-image'
      img.alt = 'Pokemon'
      document.body.appendChild(img)
    }

    if (response?.sprites?.front_default) {
      img.src = response.sprites.front_default
    } else {
      img.src = ''
      img.alt = 'No image available'
    }

  } catch (e) {
    console.error("Fetch error:", e)
    throw e
  }

}

async function main() {
  const button = document.createElement('button')
  button.textContent = 'Get Pokemon!'
  document.body.appendChild(button)

  const select = document.createElement('select')
  document.body.appendChild(select)

  select.addEventListener('change',  (event) => {
    const selectedValue = event.target.value
    fetchImage(selectedValue)
  })

  button.addEventListener('click',  () => {
    fetchAndPopulatePokemons(select)
  })
}
main()
