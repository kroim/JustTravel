import axios from 'axios';
const config = require('../data/config');
const server_url = config.server_url;
let _token = config._token;
const serverApi = axios.create({
    baseURL: server_url,
    timeout: 10000,
    headers: {'SellerZ-Token': _token, 'Content-type': 'application/json'}
});
export const getAllFlights = async () => {
    try {
        let res = await serverApi.get('/api/flight/all', {});
        // console.log("success getAllFlights", res);
        if (res.status === 200) return res.data;
        else return [];
    } catch (e) {
        console.log("error getAllFlights: ", e);
        return [
            {
                flightId: 1,
                departure: new Date(1607100168654).toISOString(),
                arrival: new Date(1607103108654).toISOString(),
                destinationAirportName: "NY Airport",
                takeoffAirportName: "CPH Airport",
                price: 932
            },
            {
                flightId: 2,
                departure: new Date(1607103518654).toISOString(),
                arrival: new Date(1607103718654).toISOString(),
                destinationAirportName: "Alaska Airport",
                takeoffAirportName: "NY Airport",
                price: 324
            },
            {
                flightId: 3,
                departure: new Date(1607103118654).toISOString(),
                arrival: new Date(1607103118654).toISOString(),
                destinationAirportName: "CPH Airport",
                takeoffAirportName: "Sidney Airport",
                price: 3204
            },
        ]
    }
};
export const getFlightItem = async (id) => {
    try {
        let res = await serverApi.get('/api/flight/id/' + id.toString());
        console.log("success getFlightItem", res);
        if (res.status === 200) return res.data;
        else return null;
    } catch (e) {
        console.log("error getFlightItem: ", e);
        // return null
        return {
            flightId: 3,
            departure: new Date(1607103118654).toISOString(),
            arrival: new Date(1607103118654).toISOString(),
            destinationAirportName: "CPH Airport",
            takeoffAirportName: "Sidney Airport",
            price: 3204
        }
    }
};
export const getFilterFlights = async (data) => {
    try {
        let res = await serverApi.post('/api/flight/all', data);
        console.log("success getFilterFlights", res);
        if (res.status === 200) return res.data;
        // else return [];
        else return [{
            flightId: 3,
            departure: new Date(1607103118654).toISOString(),
            arrival: new Date(1607103118654).toISOString(),
            destinationAirportName: "CPH Airport",
            takeoffAirportName: "Sidney Airport",
            price: 3204
        }];
    } catch (e) {
        console.log("error getFilterFlights: ", e);
        // return []
        return [{
            flightId: 3,
            departure: new Date(1607103118654).toISOString(),
            arrival: new Date(1607103118654).toISOString(),
            destinationAirportName: "CPH Airport",
            takeoffAirportName: "Sidney Airport",
            price: 3204
        }]
    }
};
export const submitBooking = async (data) => {
    try {
        let res = await serverApi.post('/api/booking/book', data);
        console.log("success submitBooking", res);
        if (res.status === 200) return res.data;
        // else return null;
        else return {msg: "success requested booking"};
    } catch (e) {
        console.log("error submitBooking: ", e);
        // return null
        return {msg: "success requested booking"}
    }
};

