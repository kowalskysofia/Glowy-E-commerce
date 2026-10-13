import { useContext } from "react"
import { OrderContext } from "./OrderProvider"

function useOrder() {
 return  useContext((OrderContext))


}

export default useOrder
