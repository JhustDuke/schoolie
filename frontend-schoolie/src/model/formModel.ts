export const formModel = (function () {
	const API_BASE_URL = "http://localhost:3333";

	/**
	 * Sends form data to the specified endpoint using POST.
	 * @param {string} url - Endpoint to send the data to.
	 * @param {FormData} formData - The form data to be sent.
	 * @returns {Promise<any>} - Parsed JSON response or throws error.
	 */
	const sendFormData = async function (
		url: string = `${API_BASE_URL}/addPupil`,
		formData: FormData
	): Promise<any> {
		try {
			const response = await fetch(url, {
				method: "POST",
				body: formData, // don't set Content-Type manually
			});
			if (!response.ok) throw new Error("Failed to upload");
			else {
				return await response.json();
			}
		} catch (err) {
			console.error("Fetch error:", err);
			throw err;
		}
	};

	return { sendFormData };
})();
