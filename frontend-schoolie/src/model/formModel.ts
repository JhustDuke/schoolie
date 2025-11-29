export const formModel = (function () {
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

	/**
	 * Sends form data to the specified endpoint using POST.
	 * @param {string} url - Endpoint to send the data to.
	 * @param {FormData} formData - The form data to be sent.
	 * @returns {Promise<any>} - Parsed JSON response or throws error.
	 */
	const sendFormData = async function (formData: FormData): Promise<any> {
		const url = `${API_BASE_URL}/addPupil`;
		try {
			const response = await fetch(url, {
				method: "POST",
				body: formData, // don't set Content-Type manually
			});

			if (!response.ok) {
				console.log("res:", response);
				const errText = await response.text();
				throw new Error(errText || response.statusText);
			}

			return await response.json();
		} catch (err: any) {
			//console.log("err", err);
			throw err || "failed";
		}
	};

	return { sendFormData };
})();
