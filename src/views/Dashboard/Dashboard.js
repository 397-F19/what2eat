import React, { useState, useEffect } from "react";
import EventDetail from './EventDetail'
import Button from "components/CustomButtons/Button.js";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import FindEventTextField from 'components/TextField/FindEventTextField';

import app from './db'

export const apiKey =
    'bWKtDZgaFdt5Zq-srgXTP_nLbhQuHA4kNw0Y8tH0GOIB8bCJsK2KgAW0epvwAhu6YJUD9CN-VG-96IOUhD9sHm_t69ZpPR_HoLnEeXgAdv_IZ-mtX67a4ftZK8GkXXYx';

const db = app.database();

export default function Dashboard({ creatingEventTest }) {
  // const [hasId, setHasId] = useState(localStorage.getItem('renderSurvey'));
  const [hasId, setHasId] = useState(false);
  const [eventID, setEventID] = useState();

  const handleCreatingEvent = () => {
    //creating new events in firebase
    const id = Math.random().toString(36).substr(2, 9)
    alert('Success! Your Event Id is, ' + id)
    creatingEventTest(id);
    setEventID(id);

    db.ref('events/' + id).set({
      location: "",
    })
    db.ref('events/' + id).child('cuisine').set({
      Pizza: 0,
      Chinese: 0,
      Mexican: 0,
      Burgers: 0, 
      Thai: 0,
      Seafood: 0,
      Italian: 0,
    })

    db.ref('events/' + id).child('price').set({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    })

    db.ref('events/' + id).child('confirmedRestaurant').set(null)

    db.ref('events/' + id).child('confirmedTime').set(null)

    db.ref('events/' + id).child('showConfirmPage').set(false)

    localStorage.setItem('renderSurvey', true)
    setHasId(true);
  }

  const handleBackClick = () => {
    localStorage.setItem('renderSurvey', false)
    setHasId(false);
  }

  const handleFindEvent = (eventid) => {
    if (Object.keys(eventid).length == 0) {
      alert("Please type in a valid event ID")
    } else {
      setHasId(true);
      setEventID(eventid);
    }
      
  }

  if (!hasId) {
    return (
      <div>
      <Button color='rose' onClick={handleCreatingEvent}>Create New Event</Button>
      <FindEventTextField eventID={eventID} setEventID={setEventID}></FindEventTextField>
      <Button color='primary' onClick={() => handleFindEvent(eventID)}>Find Event</Button>
      </div>
    )
  } else {
    return (
      <div>
        <IconButton onClick={handleBackClick}><ArrowBackIcon/></IconButton>
        <EventDetail id={eventID}/> 
      </div>)
  }

}