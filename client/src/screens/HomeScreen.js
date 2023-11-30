


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Room from '../components/Room';
// import Loader from '../components/Loader';
// import Error from '../components/Error';
// import { DatePicker } from 'antd';
// import moment from 'moment';

// function HomeScreen() {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [fromdate, setFromdate] = useState();
//   const [todate, setTodate] = useState();
//   const [duplicate, setDuplicate] = useState([]);
//   const [searchkey, setSearchKey] = useState('');
//   const [type, setType] = useState('all');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/rooms/getallRooms');
//         const data = response.data;
//         setRooms(data);
//         setDuplicate(data);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filterByDate = (dates, dateStrings) => {
//     console.log('Filtering by date:', dateStrings);
//     if (dates && dateStrings && dates.length === 2) {
//       const formattedStartDate = moment(dateStrings[0], 'DD-MM-YYYY').format('DD-MM-YYYY');
//       const formattedEndDate = moment(dateStrings[1], 'DD-MM-YYYY').format('DD-MM-YYYY');
//       setFromdate(formattedStartDate);
//       setTodate(formattedEndDate);

//       const tempRooms = duplicate.filter((room) => {
//         if (room.currentbookings.length === 0) {
//           return true;
//         } else {
//           const availability = room.currentbookings.every((booking) => {
//             const startDateIsBetween = moment(formattedStartDate, 'DD-MM-YYYY').isBetween(booking.fromdate, booking.todate);
//             const endDateIsBetween = moment(formattedEndDate, 'DD-MM-YYYY').isBetween(booking.fromdate, booking.todate);
//             return !(startDateIsBetween && endDateIsBetween);
//           });
//           return availability;
//         }
//       });

//       console.log('Filtered rooms:', tempRooms);
//       setRooms(tempRooms);
//     } else {
//       console.error('Invalid dates or dateStrings:', dates, dateStrings);
//     }
//   };

//   const filterBySearch = () => {
//     const tempRooms = duplicate.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()));
//     setRooms(tempRooms);
//   };


//   const filterByType = (e) => {
//     setType(e)
//   if(e!=='all'){
//     const selectedType = e.toLowerCase(); // Convert to lowercase for case-insensitive comparison
//     const tempRooms = duplicate.filter(room => room.type.toLowerCase()==e.toLowerCase());
//     setRooms(tempRooms);
//   }
//   else{
//     setRooms(duplicate)
//   }
//   };
  
//   return (
//     <div className='container'>
//       <div className='row mt-5 bs'>
//         <div className='col-md-3'>
//           <DatePicker.RangePicker
//             format='DD-MM-YYYY'
//             onChange={(dates, dateStrings) => filterByDate(dates, dateStrings)}
//           />
//         </div>
//         <div className='col-md-3'>
//           <input
//             type="text"
//             className='form-control'
//             placeholder='Search rooms'
//             value={searchkey}
//             onChange={(e) => setSearchKey(e.target.value)}
//             onKeyUp={filterBySearch}
//           />
//         </div>
//         <div className='col-md-3'>
//           <select className='form-control' value={type} onChange={(e) =>{filterByType(e.target.value)}} >
//             <option value='all'>All</option>
//             <option value='delux'>Delux</option>
//             <option value='non-delux'>Non-Delux</option>
//             <option value='super-delux'>Super-delux</option>
//           </select>
//         </div>
//       </div>

//       <div className='row justify-content-center mt-5'>
//         {loading ? (
//           <Loader />
//         ) : error ? (
//           <Error />
//         ) : rooms.length > 0 ? (
//           rooms.map((room) => (
//             <div className='col-md-9 mt-2' key={room.id}>
//               <Room room={room} fromdate={fromdate} todate={todate} />
//             </div>
//           ))
//         ) : (
//           <p>No rooms available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomeScreen;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import moment from 'moment';

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [duplicate, setDuplicate] = useState([]);
  const [searchkey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/getallRooms');
        const data = response.data;
        setRooms(data);
        setDuplicate(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByDate = (dates, dateStrings) => {
    if (dates && dateStrings && dates.length === 2) {
      const formattedStartDate = moment(dateStrings[0], 'DD-MM-YYYY').format('DD-MM-YYYY');
      const formattedEndDate = moment(dateStrings[1], 'DD-MM-YYYY').format('DD-MM-YYYY');
      setFromdate(formattedStartDate);
      setTodate(formattedEndDate);

      const tempRooms = duplicate.filter((room) => {
        if (room.currentbookings.length === 0) {
          return true;
        } else {
          const availability = room.currentbookings.every((booking) => {
            const startDateIsBetween = moment(formattedStartDate, 'DD-MM-YYYY').isBetween(booking.fromdate, booking.todate);
            const endDateIsBetween = moment(formattedEndDate, 'DD-MM-YYYY').isBetween(booking.fromdate, booking.todate);
            return !(startDateIsBetween && endDateIsBetween);
          });
          return availability;
        }
      });

      setRooms(tempRooms);
    } else {
      console.error('Invalid dates or dateStrings:', dates, dateStrings);
    }
  };

  const filterBySearch = () => {
    const tempRooms = duplicate.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()));
    setRooms(tempRooms);
  };

  const filterByType = (e) => {
    setType(e);
    if (e !== 'all') {
      const selectedType = e.toLowerCase();
      const tempRooms = duplicate.filter(room => room.type.toLowerCase() === e.toLowerCase());
      setRooms(tempRooms);
    } else {
      setRooms(duplicate);
    }
  };

  return (
    <div className='container'>
      <div className='row mt-5 bs'>
        <div className='col-md-3'>
          <DatePicker.RangePicker
            format='DD-MM-YYYY'
            onChange={(dates, dateStrings) => filterByDate(dates, dateStrings)}
          />
        </div>
        <div className='col-md-3'>
          <input
            type="text"
            className='form-control'
            placeholder='Search rooms'
            value={searchkey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className='col-md-3'>
          <select className='form-control' value={type} onChange={(e) => filterByType(e.target.value)}>
            <option value='all'>All</option>
            <option value='delux'>Delux</option>
            <option value='non-delux'>Non-Delux</option>
            <option value='super-delux'>Super-delux</option>
          </select>
        </div>
      </div>

      <div className='row justify-content-center mt-5'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <div className='col-md-9 mt-2' key={room.id}>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
