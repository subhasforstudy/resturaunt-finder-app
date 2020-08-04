import React from 'react';
import './Search.css';
import axios from 'axios';
import Pagination from "react-js-pagination";
import queryString from 'query-string';
import NotFound from '../../component/NotFound/NotFound';

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            restaurantList: [],
            locationList: [],
            mealDetails:[],
            cityName: "Delhi",
            mealName:"",   
            area: null,
            city: null,
            cuisine: null,
            meal: null,
            cost:null,
            sort: 1,
            ActivePage: 1,
            itemPerPage:2
        };
    }

    componentDidMount() {
        //parse data from query stings

        const values = queryString.parse(this.props.location.search)
        const area = values.location_id;
        const city = values.city_id;
        const meal_name = values.meal_name;
        this.setState({mealName:meal_name})
        const cuisine = values.cuisine;
        const meal = values.meal;
        const sort = values.sort;
        const cost1=values.cost1;
        const cost2=values.cost2;
        

        
      //fetch city data from api
             axios("http://localhost:8000/citylist")
            .then(res => this.setState({ locationList: res.data.data }))
            .catch(err => console.log(err))

     //Api call based on meal type or based on city and mealtype

            axios(`http://localhost:8000/restaurantsearchpage/${sort}?city=${city}&area=${area}&type=${meal}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`)
           .then(res => this.setState({ restaurantList: res.data.data }))
           .catch(err => console.log(err))
        
    
    

 }

      handleLocationChange = (event) => {
       const obj=JSON.parse(event.target.value);
        const area = obj.location_id;
        const city = obj.city_id;
        const cityName=obj.city_name;
        this.setState({cityName:cityName})
        const values = queryString.parse(this.props.location.search)
        const cuisine = values.cuisine;
        const meal = values.meal;
        const sort = values.sort;
       const cost1=values.cost1;
       const cost2=values.cost2;
       const meal_name = values.meal_name;

       //push data to queryString

        this.props.history.push(`/searchPage?location_id=${area}&city_id=${city}&meal=${meal}&meal_name=${meal_name}&sort=${sort}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`);

      //Api call
        axios(`http://localhost:8000/restaurantsearchpage/${sort}?city=${city}&area=${area}&type=${meal}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`)
           .then(res => this.setState({ restaurantList: res.data.data }))
           .catch(err => console.log(err))
    }

    handleCuisineChange=(event)=>{
        const target=event.target;
        const cuisine = event.target.value;
        const values = queryString.parse(this.props.location.search)
        const area = values.location_id;
        const city = values.city_id;
        const meal = values.meal;
        const sort = values.sort;
        const meal_name = values.meal_name;
       const cost1=values.cost1;
       const cost2=values.cost2;
// First checkes that is checkbox checked or not


       if (target.checked)  //if checked then push the checked cuisin value to queryString and make a api call 
       {                    //based on this checked cuisin

        this.props.history.push(`/searchPage?location_id=${area}&city_id=${city}&meal=${meal}&meal_name=${meal_name}&sort=${sort}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`);

        axios(`http://localhost:8000/restaurantsearchpage/${sort}?city=${city}&area=${area}&type=${meal}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`)
           .then(res => this.setState({ restaurantList: res.data.data }))
           .catch(err => console.log(err))
       }


       // if uncheked then we pass the cuisin value as null and make api call based on this
       else{
        this.props.history.push(`/searchPage?location_id=${area}&city_id=${city}&meal=${meal}&meal_name=${meal_name}&sort=${sort}&cuisine=null&cost1=${cost1}&cost2=${cost2}`);

        axios(`http://localhost:8000/restaurantsearchpage/${sort}?city=${city}&area=${area}&type=${meal}&cuisine=null&cost1=${cost1}&cost2=${cost2}`)
           .then(res => this.setState({ restaurantList: res.data.data }))
           .catch(err => console.log(err))
       }
    }
    
  onCostSelect=(event)=>{

    //
            const obj=JSON.parse(event.target.value);
            const cost1 = obj.cost1;
            const cost2 = obj.cost2;
            
       
        const values = queryString.parse(this.props.location.search)
        const meal_name = values.meal_name;
        const area = values.location_id;
        const city = values.city_id;
        const meal = values.meal;
        const sort = values.sort;
        const cuisine=values.cuisine;



        this.props.history.push(`/searchPage?location_id=${area}&city_id=${city}&meal=${meal}&meal_name=${meal_name}&sort=${sort}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`);

        axios(`http://localhost:8000/restaurantsearchpage/${sort}?city=${city}&area=${area}&type=${meal}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`)
        .then(res => this.setState({ restaurantList: res.data.data }))
        .catch(err => console.log(err))

           
     
    }

    handelSort=(event)=>{
        const sort = event.target.value;
        const values = queryString.parse(this.props.location.search)
        const area = values.location_id;
        const city = values.city_id;
        const meal = values.meal;
        const cost1=values.cost1;
        const cost2=values.cost2;
        const cuisine=values.cuisine;
        const meal_name = values.meal_name;


        this.props.history.push(`/searchPage?location_id=${area}&city_id=${city}&meal=${meal}&meal_name=${meal_name}&sort=${sort}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`);

        axios(`http://localhost:8000/restaurantsearchpage/${sort}?city=${city}&area=${area}&type=${meal}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`)
        .then(res => this.setState({ restaurantList: res.data.data }))
        .catch(err => console.log(err))

    }

    handlePageChange = (pageNumber) => {

        this.setState({ActivePage:pageNumber})
    }

    handleClickRestaurant = (id) => {
        const restaurantId = id;
        this.props.history.push(`/detailsPage/?restaurant=${restaurantId}`);
    }

    render() {
        const { locationList, restaurantList,mealName,cityName } = this.state;
        var end=this.state.ActivePage*this.state.itemPerPage;
        var start=end-this.state.itemPerPage;
        var NewRestaurant=restaurantList.slice(start,end);
        console.log(cityName)
        
        
        return (
            <div className="container-fluid">
                <div className="header-search">{mealName} place in {cityName} </div>
                <div className="row">
                    <div className="col-sm-3 col-md-6 col-lg-3">
                        <div className="menu-box">
                            <div className="Filters">Filters</div>
                            <div className="Select-Location">Select-Location</div>
                            <select className="location-option" onChange={this.handleLocationChange}>
                                {locationList.map((item) => {
                                    return <option value={JSON.stringify(item)}>{item.name}</option>
                                })}
                            </select>
                            <div className="Select-Location">Cuisine</div>
                            <div className="block">
                                <input className="inline-block" type="checkbox" value={1} onChange={this.handleCuisineChange} />
                                <span className="option-item inline-block">North Indian</span>
                            </div>
                            <div className="block">
                                <input className="inline-block" type="checkbox" value={2} onChange={this.handleCuisineChange} />
                                <span className="option-item inline-block">South Indian</span>
                            </div>
                            <div className="block">
                                <input className="inline-block" type="checkbox" value={3} onChange={this.handleCuisineChange} />
                                <span className="option-item inline-block">Chinese</span>
                            </div>
                            <div className="block">
                                <input className="inline-block" type="checkbox" value={4} onChange={this.handleCuisineChange} />
                                <span className="option-item inline-block">Fast Food</span>
                            </div>
                            <div className="block">
                                <input className="inline-block" type="checkbox" value={5} onChange={this.handleCuisineChange} />
                                <span className="option-item inline-block">Street Food</span>
                            </div>




                            <div className="Cost-For-Two">Cost-For-Two</div>
                            <input type="radio" name="CostForTwo" value={'{"cost1":"0","cost2":"500"}'} onChange={this.onCostSelect} /><span className="option-item">Less than 500</span><br />
                            <input type="radio" name="CostForTwo" value={'{"cost1":"500","cost2":"1000"}'} onChange={this.onCostSelect} /><span className="option-item">500 to 1000</span><br />
                            <input type="radio" name="CostForTwo" value={'{"cost1":"1000","cost2":"1500"}'} onChange={this.onCostSelect} /><span className="option-item">1000 to 1500</span><br />
                            <input type="radio" name="CostForTwo" value={'{"cost1":"1500","cost2":"2000"}'} onChange={this.onCostSelect} /><span className="option-item">1500 to 2000</span><br />
                            <input type="radio" name="CostForTwo" value={'{"cost1":"2000","cost2":"10000"}'} onChange={this.onCostSelect} /><span className="option-item"> Above 2000</span><br />




                            <div className="Sort">Sort</div>
                            <input type="radio" value={1} name="sort" onChange={this.handelSort}/><span className="option-item">Price low to high</span><br />
                            <input type="radio"  value={-1} name="sort" onChange={this.handelSort}/><span className="option-item">Price high to low</span><br />
                        </div>
                    </div>
                    <div class="col-sm-9 col-md-6 col-lg-9">
                        {NewRestaurant.length === 0 ? <NotFound/> :
                            NewRestaurant.map((item) => {
                                return <div className="Item" id={item._id} onClick={()=>this.handleClickRestaurant(item._id)}>
                                    <div className="row row-height">
                                        <div className="col-sm-3">
                                            <img className="Image" src={item.thumb} />
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="The-Big-Chill-Cakery">{item.name}</div>
                                            <div className="FORT">{item.city_name}</div>
                                            <div className="Shop-1-Plot-D-Samruddhi-Complex-Chincholi- ">{item.locality}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="CUISINES-COST-FOR-TWO">CUISINES</div>
                                            <div className="CUISINES-COST-FOR-TWO">COST FOR TWO</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="Bakery-700">{item.cuisine_Name.map((item) => { return <span>{` ${item} `}</span> })}</div>
                                            <div className="Bakery-700">{item.cost}</div>
                                        </div>
                                    </div>
                                </div>
                            })}

                            <div className="paginate">
                        <Pagination 
                            activePage={this.state.ActivePage}
                            itemsCountPerPage={2}
                            totalItemsCount={10}
                            pageRangeDisplayed={3}
                            onChange={this.handlePageChange}
                            
                        />
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}
export default Search;