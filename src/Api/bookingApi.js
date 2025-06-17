export const bookingPromise = (email, accessToken) =>{
    return fetch(`https://car-rent-server-lovat.vercel.app/bookings?email=${email}`,
                    {headers:{authorization: `Bearer ${accessToken}`}})
        .then(res=>res.json())
}