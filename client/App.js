import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchItems, itemupdate } from './store'

///////// COMPONENTS //////////////
import Items from './components/items/items'
import AddItem from './components/addItem/addItem'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import { CssBaseline } from '@mui/material'


const App = () => {
    const socket = new WebSocket(window.document.location.origin.replace('http', 'ws'));
    socket.addEventListener('message', ({ data }) => {
        const item = JSON.parse(data)
        dispatch(itemupdate(item))
        // console.log(JSON.parse(data))
        // store.dispatch(item);
    })

    const dispatch = useDispatch()
    const items = useSelector(state => state.items)
    useEffect(() => {
        try {
            dispatch(fetchItems())
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <CssBaseline />
            <Navbar />
            <AddItem />
            <Items items={items} />
            <Footer />
        </>
    )
}

export default App