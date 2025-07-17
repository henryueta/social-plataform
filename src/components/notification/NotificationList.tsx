import { useEffect, useState } from "react";
import useHandleNotification from "../../hooks/useHandleNotification"
import useHandleList from "../../hooks/useHandleList";

const NotificationList = () => {

  const {onGetNotificationList} = useHandleNotification();
  
  // const {listState} = useHandleList({
  //   config:{
  //     limit:10,
  //     mode:"automatic",
  //     page:1
  //   },

  // });
  const [notificationListData,setNotificationListData] = useState(null);
  
  

  return (
    <div>
      
    </div>
  )
}

export default NotificationList
