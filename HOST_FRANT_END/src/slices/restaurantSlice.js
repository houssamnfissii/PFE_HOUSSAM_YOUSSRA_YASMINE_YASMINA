import {createSlice} from '@reduxjs/toolkit'

const initialState={ restaurants : [
    {
      id: 1,
      name: 'New Andalous',
      description: 'Description of Restaurant 1',
      imageUrl: ['/images/rc.jpg','/images/rr2.jpg','/images/rr3.jpg','/images/rr4.jpg','/images/rr5.jpg','/images/rr6.jpg','/images/rr7.jpg','/images/rr8.jpg'],
      ville:'Tanger',
      address: '123 Main St,Maroc',
      cuisine:"Marocain"
    },
    {
      id: 2,
      name: 'RRIC',
      description: 'Description of Restaurant 2',
      imageUrl: ['/images/rc.jpg','/images/rr2.jpg','/images/rr3.jpg','/images/rr4.jpg','/images/rr5.jpg','/images/rr6.jpg','/images/rr7.jpg','/images/rr8.jpg'],
      ville:'Tanger',
      address: '456 Elm St, tanger,Maroc',
      cuisine:"Marocain"

   
    },
    {
        id: 3,
        name: 'Cheringuito',
        description: 'Description of Restaurant 2',
        imageUrl:  ['/images/chr.jpg','/images/rr2.jpg','/images/rr3.jpg','/images/rr4.jpg','/images/rr5.jpg','/images/rr6.jpg','/images/rr7.jpg','/images/rr8.jpg'],
        ville:'Tanger',
        address: '456 Elm St,Maroc',
        cuisine:"Indian"

     
      },
      {
        id: 4,
        name: 'Barcello',
        description: 'Description of Restaurant 2',
        imageUrl:  ['/images/br.jpg','/images/rr2.jpg','/images/rr3.jpg','/images/rr4.jpg','/images/rr5.jpg','/images/rr6.jpg','/images/rr7.jpg','/images/rr8.jpg'],
        ville:'Tanger',
        address: '456 Elm St, tanger,Maroc',
        cuisine:"American"

     
      },
      {
        id: 5,
        name: 'Cabestan',
        description: 'Description of Restaurant 2',
        imageUrl:  ['/images/cabestan.jpg','/images/rr2.jpg','/images/rr3.jpg','/images/rr4.jpg','/images/rr5.jpg','/images/rr6.jpg','/images/rr7.jpg','/images/rr8.jpg'],
        ville:'Casablanca',
        address: '456 Elm St,Maroc',
        cuisine:"Marocain"

     
      },
      {
        id:6,
        name: 'Panorama',
        description: 'Description of Restaurant 2',
        imageUrl:  ['/images/panorama.jpg','/images/rr2.jpg','/images/rr3.jpg','/images/rr4.jpg','/images/rr5.jpg','/images/rr6.jpg','/images/rr7.jpg','/images/rr8.jpg'],
        ville:'Tanger',
        address: '456 Elm St,Maroc',
        cuisine:"Marocain"

     
      },
      {
        id: 7,
        name: 'ledhow',
        description: 'Description of Restaurant 2',
        imageUrl:  ['/images/ledhow.jpg','/images/rr2.jpg','/images/rr3.jpg','/images/rr4.jpg','/images/rr5.jpg','/images/rr6.jpg','/images/rr7.jpg','/images/rr8.jpg'],
        ville:'Rabat',
        address: '456 Elm St, Maroc',
        cuisine:"Marocain"

     
      },
      {
        id: 8,
        name: 'Dawliz',
        description: 'Description of Restaurant 2',
        imageUrl: ['/images/dawliz.jpg','/images/rr2.jpg','/images/rr3.jpg','/images/rr4.jpg','/images/rr5.jpg','/images/rr6.jpg','/images/rr7.jpg','/images/rr8.jpg'],
        ville:'Rabat',
        address: '456 Elm St,Maroc',
        cuisine:"American"

     
      }
],ville:[{id:1,nom:'Tanger'},{id:2,nom:'Casablanca'},{id:3,nom:'Marrakech'},{id:4,nom:'Agadir'},,{id:5,nom:'Rabat'}],
cuisine:[{id:1,name:"American"},{id:1,name:"Marocain"} ,{id:1,name:"Indian"}],
reservations:[{ id:1, start_date:"", end_date:"" , reservation_date:"" , nbr_people:"" , offer_id:"" , client_id:""}],
offrer:[{id:"" ,type:"",description:"" , restaurant_id:"1"}]
}


const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {
      addReservation: (state, action) => {
        state.reservations.push(action.payload);
      },
    },
  });
  
  export const { addReservation } = restaurantSlice.actions;
  
  export default restaurantSlice.reducer;