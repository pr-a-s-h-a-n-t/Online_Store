import React, { useEffect } from 'react'
import { Notification } from "../../../utils/Notifications";

function Profile() {
  const[showNotifications, setShowNotification] = React.useState(false);

useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
   
    //   setShowNotification(true);
      Notification ({
        message: `Welcome ${user.name}!`,
        type: 'success',
      })
    } 
})


  return (
    <div>this is Profilepage</div>
  )
}

export default Profile

 
