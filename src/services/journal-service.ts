import axios from "axios"
import api from "../const/api"

class JournalService {
	async first(date: string) {
		try {
			await api.post(`/journal/first/${date}`,)
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const msg = err.response?.data?.message || err.message || "Scan failed"
				console.error("Scan error:", msg)
				throw new Error(msg)
			} else {
				console.error("Unexpected error:", err)
				throw err
			}
		}
	}
	async second(uuid: string) {
		try {
			await api.post(`/journal/second/${uuid}`,)
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const msg = err.response?.data?.message || err.message || "Scan failed"
				console.error("Scan error:", msg)
				throw new Error(msg)
			} else {
				console.error("Unexpected error:", err)
				throw err
			}
		}
	}
	async getJournal(uuid: string) {
		try {
			const res = await api.get(`/journal/user/${uuid}`)
			return res.data
		} catch (err) {
			console.error("Unexpected error:", err)
			throw err
		}
	}
	async getMyJournal() {
		try {
			const res = await api.get(`/journal/my`)
			return res.data
		} catch (err) {
			console.error("Unexpected error:", err)
			throw err
		}
	}
}
export default new JournalService()