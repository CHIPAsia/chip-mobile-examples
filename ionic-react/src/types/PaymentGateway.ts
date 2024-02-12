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

  async createPurchase(data: {
    client: {
      email: string
      name: string
      phone: string
    }
    product: {
      name: string
      price: number
    }
  }) {
    return await this._axios
      .request({
        method: 'POST',
        url: `/create_purchase`,
        data: data,
      })
      .then(res => res.data)
  }
}
