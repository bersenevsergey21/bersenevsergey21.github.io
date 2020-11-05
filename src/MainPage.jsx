import React, {useState,useEffect} from 'react';
import axios from 'axios'
import classes from './classes.module.css'

const MainPage = (props) => { 
  /*put data from server into array*/
  const followToPokemon = (url, name) => {
  let image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + +/\d+/.exec(url.substr(-6, 6)) + ".png"
  axios.get(url)
    .then(res1 => {axios.get(res1.data.pokemon[0].pokemon.url)
    .then(res2 => {InfoArray.unshift(image)
                   InfoArray.unshift(name)
                   InfoArray.unshift(res2.data.types[0].type.name)
                   InfoArray.unshift(res2.data.weight);
                   InfoArray.unshift(res2.data.height);
                   InfoArray.unshift(res2.data.base_experience);
                   InfoArray.unshift(res2.data.forms[0].name);
                   InfoArray.unshift(res2.data.abilities[0].ability.name);
                   setList(false)
                   setInfoArray(InfoArray)
                   setMainMenu(false)
                  }
         )
                  }
         )
  }
  /*Some necessary constants*/
  const pokemonsInPage = 5;
  const [InfoArray, setInfoArray] = useState(["no info","no info","no info",0,0,"no info","Choose Pokemon","https://i.pinimg.com/236x/c0/81/72/c08172de4c092064dd4216d7fa902298.jpg"]);
  const [pokemonList, setPokemonList] = useState([]);
  const [countPokemon, setCountPokemon] = useState(100);
  const [currentPage, setCurrentPage] = useState(1)
  const [mainMenu, setMainMenu] = useState(true)
  const [blur, setBlur] = useState(false);
  const [list, setList] = useState(false)
  const [listAllPokemon, setListAllPokemon] = useState([])
  /*Here constants and functions for pagination*/
  const [previousNum, setPreviousNum] = useState(0)
  const previous = () => {setPreviousNum(previousNum-pokemonsInPage)}
  const future = () => {setPreviousNum(previousNum+pokemonsInPage)}
  let futureNum = previousNum + pokemonsInPage;
  let pagesArray = []
  let pagesQuantity = Math.ceil(countPokemon/8); 
  const onPageChanged = (i) => {
    setCurrentPage(i)
    i--
    axios.get(`https://pokeapi.co/api/v2/ability/?limit=${8}&offset=${i*8}`)
    .then(res => {setPokemonList(res.data.results.map(p => p))})
  } 
    for (let i = 1; i <= pagesQuantity; i++) {
      pagesArray.push(i)
    } 
  
/*  const allPokemon = () => {
    axios.get("https://pokeapi.co/api/v2/ability/")
      .then(res1 => {setCountPokemon(res1.data.count)})
      .then(res2 => {axios.get(`https://pokeapi.co/api/v2/ability/?limit=290&offset=0`)})
      .then(res3 => {setList(res3.data.results.map(p => p)); console.log(list)})
  }*/
  
  const allPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/ability/?limit=${293}&offset=0`)
     .then(res => {setListAllPokemon(res.data.results.map(p => p)); console.log(listAllPokemon)})
  }
  /*End of constants and functions for pagination*/
  
 useEffect(()=>{
   axios.get(`https://pokeapi.co/api/v2/ability/?limit=${8}&offset=0`)
     .then(res => {setPokemonList(res.data.results.map(p => p))})}, [])

 useEffect(()=>{
   axios.get("https://pokeapi.co/api/v2/ability/").then(res => {setCountPokemon(res.data.count)})}, [])


  return (
    <div>
      {blur 
        ? <div className={classes.blur} onClick={()=>{setBlur(false)}}>
            <div className={classes.textOnBlur} onClick={()=>{setBlur(false)}}>
            Это приложение способно получать данные с сервера с помощью get-запросов и имеет адаптивную верстку.
            Данный сайт имеет навигационное меню и страницы и написан по принципу SPA. 
              <ul>
                <li> Проект не предполагает расширения и добавления новых модулей. Соответственно, не использует BrowserRouter и NavLink to</li>
                <li> Имеется всего несколько переменных, и все они используются только в одной компоненте. Таким образом, прокидывание данных через props'ы неприменимо. Вместо global State и контейнерных компонент используется UseState</li>
                <li> Отсутсвие Redux Thunk (middleware-прослойки) продиктовано этими же причинами. Запросы идут сразу из компонент. Это нарушает принцип чистой функции, но избавляет малозадачное приложение от обрастания дополнительными модулями.</li>
              </ul>
            C ещё одним проектом react-приложения, использующего глобальный и локальные стейты, redux-form, редьюсеры, Thunk, HOC  и общающимся с сервером с помощью get, put и delete запросов можно ознакомиться ниже:
              <div className={classes.aryy}>
                <div className={classes.flexOnBlur}>
                  <a href="https://sergeybersenev98.github.io/"><button>Запуск приложения на Github</button></a>
                  <a href="https://github.com/SergeyBersenev98/SergeyBersenev98.github.io"><button>Просмотр кода приложения на Github</button></a>
                </div>
              </div>
            </div>
          </div>
        : <div></div>}
      <div className={classes.header}>  
        <div onClick={()=>{setMainMenu(true); setList(false)}}>Main page</div>
        <div onClick={()=>{setMainMenu(false); setList(false)} }>Pokemon</div>
        <div onClick={()=>{setList(true); setMainMenu(false); setBlur(false); allPokemon()}}>List</div>
        <div onClick={()=>{setBlur(true)}}>About</div>
      </div>
      {list
        ? <div className={classes.listOfPokemons}>  
          {listAllPokemon.map(d=> <div key={d.url} className={classes.boxOfAllNames} 
                                    onClick={()=>{followToPokemon(d.url, d.name)}}>
                                    <div>
                                      {d.name}
                                    </div>
                                  </div>      
                             )
            }      
          </div>
        : <div></div>
      }
      {mainMenu 
        ? 
        <div className={classes.mainMenu}>
          <div className={classes.m}>
            <div className={classes.mainBox}>
              {pokemonList.map(d => 
                <div key={d.url} className={classes.box} onClick={()=>{followToPokemon(d.url, d.name)}}>
                                 <img src = {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + +/\d+/.exec(d.url.substr(-6, 6)) + ".png"} alt="Pokemon"/>
                                 <div className={classes.boxName}>
                                  {d.name}
                                 </div>
                </div>
                              )
              }
            </div>
          </div>
        <div className = {classes.previousAndFutures}> 
          <button className={classes.previousAndNext}onClick = {previous} disabled = {previousNum<1 ? "disabled" : ""}>&lt;</button>
            {pagesArray
              .filter(i => i>previousNum && i<=futureNum)
              .map(i => {
                return <span key = {i} className = {currentPage === i 
                  ? classes.currentPage 
                  : classes.no} onClick = {(e) => {onPageChanged(i)}} ><b>{i}&nbsp; </b></span>})}
          <button className={classes.previousAndNext}onClick = {future} disabled = {futureNum>pagesQuantity ? "disabled" : ""}>&gt;</button>
        </div>
      </div>
      : 
     <div>
        {list 
          ? <div></div> 
          :
      <div>
        <div className={classes.pokemonMainBox}>
          <div className={classes.pokemonNameBox}>{InfoArray[6]}</div>
            <div className={classes.pokemonMainInfoBox}>
              <div className={classes.center}>
                <img src = {InfoArray[7]} alt="Pokemon"></img>
              </div>  

              <div className={classes.pokemonInfoBox}>

                <div className={classes.flex}>
                  <div>Type:</div>
                  <div>{InfoArray[5]}</div>
                </div>

                <div className={classes.flex}>
                  <div>Weight:</div>
                  <div>{" "}{InfoArray[4]}</div>
                </div>

                <div className={classes.flex}>
                  <div>Height:</div>
                  <div>{" "}{InfoArray[3]}</div>
                </div>

                <div className={classes.flex}>
                  <div>Experience:</div>
                  <div>{InfoArray[2]}</div>
                </div>
  
                <div className={classes.flex}>
                  <div>Forms:</div>
                  <div>{InfoArray[1]}</div>
                </div>
  
                <div className={classes.flex}>
                  <div>Abilities:</div>
                  <div>{InfoArray[0]}</div>
                </div>
              </div> 
          </div>     
          </div>  
        <button className={classes.buttonContinue}onClick={()=>{setMainMenu(true)}}>Continue</button>
      </div>}
      </div>
      }
    </div>
  )
}
export default MainPage

