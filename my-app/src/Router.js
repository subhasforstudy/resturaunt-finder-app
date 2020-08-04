import React,{Component} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './component/Header/Header';
import Home from './Pages/Home/Home'
import Search from './Pages/Search/Search';
import Details from './Pages/Details/Details';

class Router extends Component{
    render(){
        return(
            <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" render={ () =>(
                        <Redirect to="homePage" />
                    )} />

                    <Route exact path="/homePage" component={Home} />
                    <Route exact path="/searchPage" component={Search} />
                    <Route exact path="/detailsPage" component={Details} />

            
                </Switch>
            </div>
            </BrowserRouter>
        )
    }
}

export default Router;
