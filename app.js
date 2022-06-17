const express = require('express');
const app = express();

app.listen('3000',()=>{
    console.log("Welcome uber service")
})

app.use(express.json())


app.post('/bookcab',(req,res)=>{
    let nearestCab = getCab(req.body.currentCordinates,req.body.requestedLocation);
    let driverDetails = availableDrivers.find(item => item.id === nearestCab.id);
    res.send(driverDetails)
})

function getCab(passengerCurrentLocation) {
    let availableDriver = availableDrivers.filter((item)=> item.available);
    let allDriversDistance = [];
    let thresholdDistance= 8;
    for(let i = 0; i < availableDriver.length; i++) {
        allDriversDistance.push({id:availableDriver[i].id,distance: distanceCalculator(passengerCurrentLocation,{x:availableDriver[i].x,y:availableDriver[i].y})})
    }
    console.log(allDriversDistance)
    allDriversDistance.sort((a,b)=>{
        return a.distance - b.distance
    })

    return allDriversDistance[0]
}

function distanceCalculator(current,requested) {
    const distance = Math.ceil(Math.sqrt(Math.pow(Math.abs(requested.x - current.x),2) + Math.pow(Math.abs(requested.y - current.y),2)))
    return distance;
}
const availableDrivers = [{id:1,x:4,y:3,available: true} ,{id:2,x: 20,y:12,available: true},{id:3,x: 2,y:1,available: false}]