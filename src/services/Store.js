import axios from "axios";
const baseURL = "https://upayments-studycase-api.herokuapp.com/api/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im96a2FuZXJiYXR1aGFuQGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9vemthbmVyYmF0dSIsImlhdCI6MTY2NDczNzg0NywiZXhwIjoxNjY1MTY5ODQ3fQ.poQ7OgydTjBJ35Px4ESrO1Tp-3lk8UQNQeb8z4Yz0Po"
class StoreService {
    constructor() {
        this.instance = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async getProduct(id = "") {
        return (await this.instance.get(`products/${id}`)).data;
    }
    async getCategory(id="") {
        return (await this.instance.get(`/categories/${id}`)).data
    }
    async addProduct(data) {
        return (await this.instance.post(`/products`, data)).data
    }
}

export default new StoreService();