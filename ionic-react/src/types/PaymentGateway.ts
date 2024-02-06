import axios, { Axios } from 'axios'

export class PaymentGateway {
  private _endpoint = `${import.meta.env.VITE_API_URL}/api`
  static redirectUrl = `${import.meta.env.VITE_API_URL}/redirect`

  private _axios: Axios

  constructor() {
    this._axios = axios.create({
      baseURL: this._endpoint,
    })
  }

  async createPurchase() {
    return await this._axios
      .request({
        method: 'GET',
        url: `/create_purchase`,
      })
      .then(res => res.data)
  }
}
