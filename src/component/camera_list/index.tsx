import React from "react";
import { Camera } from "@/type";
import { fetchCamera } from "@/service/camera";



const CameraList = () => {
  const [camera, setCamera] = React.useState<Camera | []>([])
  const handleFetchCamera = async() =>{
    let res = await fetchCamera()
    
    setCamera(res.data.DT)
    console.log('camera', camera)
  }
  React.useEffect(() =>{
    handleFetchCamera();
  },[])
  return (
    <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                camera && Array.isArray(camera) ? (
                  camera.map((item:Camera, index:any) =>(
                    <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                key={index}
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-md border "
                    src={item.ipAddress}
                    alt="None image"
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{item.name}</div>
                    <div className="font-normal text-gray-500">
                      {item.room?.name}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">
                  {
                    item.status == 1 ? (
                      <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      Online
                    </div>
                    ) 
                    :
                    (
                      <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div>{" "}
                      Offline
                    </div>
                    )
                  }

                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
                    </>
                  ) )
                ) :(
                  <>

                  </>
                )
              }
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default CameraList;
