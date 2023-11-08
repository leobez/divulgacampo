export const useValidateURL = () => {

	const validateURL = (links) => {

		let falseFlag = 0

		try {
			//Currently only google forms patterns
			const patterns = [
				/https:\/\/docs.google.com\/forms\/d\/e\/[^/]+\/viewform/,
				/https:\/\/forms.gle\/[^/]/
			]
			console.log("chegou")
			Object.values(links).map((link) => {
				let flag = 0;
				patterns.map(pattern => {
					if (pattern.test(link)) flag = 1
				})
				// There is an invalid link
				if (flag === 0) falseFlag = 1
			})
		} catch (error) {
			falseFlag = 1
		}

		if (falseFlag === 1) return false
		return true
	}

	return {
		validateURL
	}

}