import { createContext } from "react";

const RefreshContext = createContext({
	refresh: null,
	setRefresh: () => {}
})

export default RefreshContext