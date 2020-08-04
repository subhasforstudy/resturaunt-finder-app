import React, { Component } from 'react';
import queryString from 'query-string'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Details.css';
import axios from 'axios';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurantDetail: []
        }
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        const restuarantId = values.restaurant;
        console.log(restuarantId);
        axios(`http://localhost:8000/resturauntlist?_id=${restuarantId}`)
            .then(res => this.setState({  restaurantDetail: res.data.data }))
            .catch(err => console.log(err))

       
    }

    render() {
        const { restaurantDetail } = this.state;
        return (<div>
        
                
                  {restaurantDetail.map((item)=>{
                 return<div>   
                  <div> <img src={item.thumb} alt="item-img"/></div>   
                 <div className="heading"> {`${item.name}`}</div>
                 <Tabs>
                    <TabList>
                    <Tab><span className="overview">Overview</span></Tab>
                        <Tab><span className="overview">Contact</span></Tab>
                    </TabList>

                        <TabPanel>
                            <div>
                                <div className="about">About this Place</div>
                                <br />
                                <div className="cuisine">Cuisine</div>
                                <div className="bakery">{item.cuisine_Name.map((item) => { return <span>{` ${item} `}</span> })}</div>
                                <br />
                                <div className="cuisine">Average Cost</div>
                                <div className="bakery">{`₹${item.cost} for two people(approx).`}</div>
                            </div>
                        </TabPanel>
                            <TabPanel>
                                <div>
                                    <div className="phone-number">Phone Number</div>
                                    <div className="pdigit">{item.phone_no}</div>
                                    <br />
                                    <div className="bheader">{item.name}</div>
                                    <div className="address">{item.address}</div>
                                </div>
                            </TabPanel>
                  </Tabs>
                </div>
                })} 
           
       </div> )
    }
 }
export default Details;