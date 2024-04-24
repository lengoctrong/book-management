import createApiClient from './apiService'

class UserService {
  constructor(baseUrl = '/api/users') {
    this.api = createApiClient(baseUrl)
  }
  async getAll() {
    return (await this.api.get('/')).data
  }

  async create(data) {
    try {
      return (await this.api.post('/', data)).data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async deleteAll() {
    return (await this.api.delete('/')).data
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data
  }
}

export default new UserService()
