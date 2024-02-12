import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser'
import { Device } from '@capacitor/device'
import {
  IonButton,
  IonCol,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from '@ionic/react'
import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PaymentGateway } from '../types/PaymentGateway'
import './CheckoutContainer.css'

const CheckoutContainer: React.FC<{}> = () => {
  const history = useHistory()
  const {
    location: {
      state: { data },
    },
  }: { location: any } = history

  const [param, setParam] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const pgInstance = new PaymentGateway()
  /**
   * Set to false to process the postMessage from redirect webpage.
   * Check on file ./api/redirect.html on <script /> section
   * for its postMessage script
   **/
  const processInjectScript = true

  const handleCheckout = useCallback(async () => {
    const device = await Device.getInfo()
    if (!['ios', 'android'].includes(device.platform)) {
      alert('Please run this app from device or simulator')
      return
    }

    if (
      !param.email.trim() ||
      !param.phone.trim() ||
      !param.name.trim()
    ) {
      alert('Please fill in your detail')
      return
    }

    const payload = {
      product: {
        name: data.name,
        price: data.price,
      },
      client: param,
    }
    const res = await pgInstance
      .createPurchase(payload)
      .then(res => res)

    if (!res.checkout_url) {
      alert('Unable to create purchase link')
      return
    }
    const ref = InAppBrowser.create(res.checkout_url, '_blank')

    ref.on('loadstop').subscribe(param => {
      const { url } = param
      if (url.startsWith(PaymentGateway.redirectUrl)) {
        ref.executeScript({
          code: `
            var urlParams = new URLSearchParams(window.location.search);
            var success = urlParams.get('success');
      
            setTimeout(() => {
              webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({
                "event": "paymentRedirect",
                "status": success === "true" ? "success" : "fail",
                "source": "app",
              }));
            }, 2000)
          `,
        })
      }
    })

    ref.on('message').subscribe((event: any) => {
      const { data } = event
      if (
        (processInjectScript && data.source !== 'app') ||
        (!processInjectScript && data.source === 'app')
      )
        return

      ref.close()
      history.push(`/redirect?status=${event.data.status}`)
    })
  }, [param.email, param.name, param.phone])

  const handleTextChange = (e: any) => {
    const { name, value } = e.target
    setParam(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  return (
    <>
      <IonGrid
        style={{
          padding: '20px',
        }}
      >
        <IonRow
          style={{
            flex: 1,
          }}
        >
          <IonCol>
            <IonList>
              <IonItem className='list-item'>
                <div>
                  <IonImg
                    alt={data.name}
                    src={data.image}
                    style={{
                      width: '80px',
                      marginRight: '10px',
                    }}
                  />
                </div>
                <IonLabel>
                  <div>{data?.name}</div>
                  <div>
                    <span
                      style={{
                        fontSize: '15px',
                        color:
                          'var(--ion-card-color, var(--ion-item-color, var(--ion-color-step-600, #666666)))',
                      }}
                    >{`RM ${data?.price / 100}`}</span>
                  </div>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCol>
        </IonRow>

        <IonRow
          style={{
            margin: '10px 0px',
          }}
        >
          <IonCol>
            <span
              style={{
                fontSize: '20px',
              }}
            >
              {'Your Detail'}
            </span>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonList>
            <IonItem className='list-item'>
              <IonInput
                name='name'
                label='Name'
                placeholder='John Doe'
                autofocus
                labelPlacement='stacked'
                onIonInput={handleTextChange}
              ></IonInput>
            </IonItem>
            <IonItem className='list-item'>
              <IonInput
                name='email'
                label='Email'
                placeholder='email@example.com'
                type='email'
                labelPlacement='stacked'
                onIonInput={handleTextChange}
              ></IonInput>
            </IonItem>
            <IonItem className='list-item'>
              <IonInput
                name='phone'
                label='Phone Number'
                placeholder='+601234556'
                type='tel'
                labelPlacement='stacked'
                onIonInput={handleTextChange}
              ></IonInput>
            </IonItem>
          </IonList>
        </IonRow>
        <IonRow
          style={{
            margin: '10px 0px',
          }}
        >
          <IonCol>
            <IonButton expand='block' onClick={handleCheckout}>
              Checkout
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  )
}

export default CheckoutContainer
