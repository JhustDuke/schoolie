export const navBarModel = (function () {
	const baseDeleteUrl = "http://localhost:3333/delete?";
	const searchUrl = "http://localhost:3333/search?";
	const authUrl = "http://localhost:3333/auth";

	// Build query string from an object
	const buildQuery = function (obj: Record<string, string>) {
		const queryData: string[] = [];
		for (let key in obj) {
			queryData.push(`${key}=${encodeURIComponent(obj[key])}`);
		}
		return queryData.join("&");
	};

	// --- SEARCH MODEL ---
	const searchModel = async function (params: Record<string, string>) {
		try {
			const fullUrl = searchUrl + buildQuery(params);
			const res = await fetch(fullUrl);
			const data = await res.json();

			if (!res.ok) {
				// Show backend-provided response message
				throw new Error(
					data.response || `Request failed with status ${res.status}`
				);
			}

			return data.response.length > 0 ? data.response : null;
		} catch (error: any) {
			console.error("Search Error:", error.message);
			throw error;
		}
	};

	// --- LOGIN ---
	const login = async function (payload: Record<string, string>) {
		try {
			const response = await fetch(`${authUrl}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(`Login failed with status ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error: any) {
			console.error("Login Error:", error.message);
			throw error;
		}
	};

	// --- SIGNUP ---
	const signUp = async function (payload: Record<string, string>) {
		try {
			const response = await fetch(`${authUrl}/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(`Signup failed with status ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error: any) {
			console.error("Signup Error:", error.message);
			throw error;
		}
	};

	// --- DELETE SINGLE SESSION (REAL) ---
	const deleteSession = async function (session: string): Promise<any> {
		try {
			const query = buildQuery({ session });
			const fullUrl = `${baseDeleteUrl}${query}`;
			const response = await fetch(fullUrl, { method: "DELETE" });

			if (!response.ok) {
				throw new Error(`Delete failed with status ${response.status}`);
			}

			return await response.json();
		} catch (error: any) {
			console.error("Delete Error:", error.message);
			throw error;
		}
	};

	const forgotPassword = async function (payload: { email: string }) {
		try {
			const response = await fetch(`${authUrl}/forgot-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!response.ok)
				throw new Error(`Password reset failed: ${response.status}`);
			return await response.json();
		} catch (error: any) {
			console.error("Forgot Password Error:", error.message);
			throw error;
		}
	};
	// --- MOCKS ---
	const loginMock = async function (payload: Record<string, string>) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				const success = payload.email === "test@school.com";
				resolve({
					success,
					message: success ? "Login successful" : "Invalid credentials",
					token: success ? "mock-jwt-token" : null,
				});
			}, 2000);
		});
	};

	const signUpMock = async function (payload: Record<string, string>) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				const success = !!payload.email && !!payload.password;
				resolve({
					success,
					message: success
						? "Signup successful, welcome!"
						: "Missing required fields",
					userId: success ? Date.now() : null,
				});
			}, 2000);
		});
	};

	// --- DELETE SINGLE SESSION (MOCK) ---
	const deleteSessionMock = async function (session: string): Promise<any> {
		return new Promise(function (resolve) {
			setTimeout(function () {
				const success = !!session;
				resolve({
					success,
					message: success
						? `Deleted session: ${session}`
						: "No session provided",
				});
			}, 1500);
		});
	};
	const forgotPasswordMock = async function (payload: { email: string }) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				const success = !!payload.email;
				resolve({
					success,
					message: success
						? `password reset sent to email : ${payload.email}`
						: "email doesnt exist",
				});
			}, 1500);
		});
	};

	return {
		searchModel,
		login,
		loginMock,
		signUp,
		signUpMock,
		deleteSession,
		deleteSessionMock,
		forgotPassword,
		forgotPasswordMock,
	};
})();
