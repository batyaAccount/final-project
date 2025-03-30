import {  RouterProvider } from "react-router"
import { router } from "./router"
import { Provider } from "react-redux"
import store from "./UserRedux/reduxStore"


export default () => {

    return (<>
        <Provider store={store} >
            <RouterProvider  router={router}></RouterProvider>
        </Provider>

    </>)

}

