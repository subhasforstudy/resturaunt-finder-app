const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017";
let db;
app.use(cors());


app.get('/',(req,res) => {
    res.send("Hi ,Now you are connects with Us");
})


app.get('/citylist',(req,res) => {
    db.collection('city').find().toArray((err,result)=>{
        if (err) throw err;
        res.send({type:"citylist",data:result})
    })
})


app.get('/mealtype',(req,res) => {
    db.collection('mealtype').find().toArray((err,result)=>{
        if (err) throw err;
        res.send({type:"mealtype",data:result})
    })
})

app.get('/cuisine',(req,res) => {
    db.collection('cuisins').find().toArray((err,result)=>{
        if (err) throw err;
        res.send({type:"cuisine",data:result})
    })
})

app.get('/resturauntlist',(req,res) => {
    var query={};
    if(req.query){
        query=req.query;
    }
    db.collection('resturaunt').find(query).toArray((err,result)=>{
        if (err) throw err;
        res.send({type:"resturauntlist",data:result})
    })
})

app.get('/resturauntlist/:id',(req,res) => {
    //var id = req.params.id
   var {id} = req.params
    db.collection('resturaunt').find({_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send({type:"restaurantsearchpageById",data:result})
    })
})


//Restaurantsearchpage filter part
app.get('/restaurantsearchpage/:sort',(req,res) => {
      var sort =1                 //set sort by default 1
    if(req.params.sort){
        sort = req.params.sort  //if sort change then catch it
    }
    var sortquery = {cost:parseInt(sort)}   //convert into integer



    const queryParams = req.query;
    var area="null";                        //by default set null
    if(queryParams.area){
        area = queryParams.area;
    }       
    var city="null";
      if(queryParams.city){
        city = queryParams.city;
        console.log(city)
    }    
    
    var type="null";
    if(queryParams.type){
        type = queryParams.type;
    }

    var cuisine="null";
    if(queryParams.cuisine){
        cuisine = queryParams.cuisine;
    }

    var cost1="null";
    if(queryParams.cost1){
        cost1 = queryParams.cost1
    }

    var cost2="null";
    if(queryParams.cost2){
        cost2 = queryParams.cost2;
    }
    
    const cost11=parseInt(cost1);//  convert upper range into integer
   
    const cost22=parseInt(cost2);//  convert lower range into integer


 

   
    if(type!=="null" && city!=="null")
    {
	console.log("I am in First Section")
    if(type!=="null" && city!=="null" && cuisine!=="null" && cost2!=="null"){
        console.log("I am in First Section and first option")
        return db.collection('resturaunt').find({ city:city,area:area,type:type,Cuisine:cuisine,cost:{ $gt : cost11, $lt : cost22}}).sort(sortquery).toArray((err,result)=>{
            if(err) throw err;
            res.send({type:"restaurantsearchpage",data:result})
            
        })
    
     }
    


     else if(type!=="null" && city!=="null" && cuisine!=="null"){
         console.log("I am in First Section and secvond option")
        return db.collection('resturaunt').find({ city:city,area:area,type:type,Cuisine:cuisine}).sort(sortquery).toArray((err,result)=>{
            if(err) throw err;
            res.send({type:"restaurantsearchpage",data:result})
            
        })
    }

     else if(type!=="null" && city!=="null" && cost1!=="null"){
         console.log("I am in First Section and 5th option")
        return db.collection('resturaunt').find({ city:city,area:area,type:type,cost:{ $gt : cost11, $lt : cost22}}).sort(sortquery).toArray((err,result)=>{
            if(err) throw err;
            res.send({type:"restaurantsearchpage",data:result})
            
        })
    }


   else if(type!=="null" && city!=="null"){
     console.log("I am in First Section and third option")
        return db.collection('resturaunt').find({ city:city,area:area,type:type}).sort(sortquery).toArray((err,result)=>{
            if(err) throw err;
            res.send({type:"restaurantsearchpage",data:result})
            
        })    
    }
	 else{
        res.send({massage:"pls Check in first section"})
    }
	
	 }
	 
	else{
        console.log("i am in second section")
	 if(type!=="null" && cost2!=="null" && cuisine!=="null"){
          console.log("i am in second section and first option")
        return db.collection('resturaunt').find({type:type,Cuisine:cuisine,cost:{ $gt : cost11, $lt : cost22}}).sort(sortquery).toArray((err,result)=>{
            if(err) throw err;
            res.send({type:"restaurantsearchpage",data:result})
            
        }) 
    }
     else if(type!=="null"&&cuisine!=="null"){
         console.log("i am in second section and second option")
        return db.collection('resturaunt').find({ Cuisine:cuisine,type:type}).sort(sortquery).toArray((err,result)=>{
            if(err) throw err;
            res.send({type:"restaurantsearchpage",data:result})
            
        })  

     }
     else if(type!=="null"&&cost2!=="null"){
         console.log("i am in second section and third option")
        return db.collection('resturaunt').find({type:type,cost:{ $gt : cost11, $lt : cost22}}).sort(sortquery).toArray((err,result)=>{
            if(err) throw err;
            res.send({type:"restaurantsearchpage",data:result})
            
        }) 
         
    }
	else if(type!=="null"){
         console.log("i am in second section and fourth option")
       return db.collection('resturaunt').find({type:type}).sort(sortquery).toArray((err,result)=>{
            if(err) throw err;
            res.send({type:"restaurantsearchpage",data:result})
            
        })     
    }
	
	 else{
        res.send({massage:"pls Check in second section"})
    }
	
	
	
	
}
    
});













MongoClient.connect(url,(err,client) => {
    if(err) console.log('error while connecting');
    db = client.db('Test');
    app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
    })
});