import { createContext } from "react";

const RefreshContext = createContext({
	refresh: false,
	setRefresh: () => {}
})

export default RefreshContext