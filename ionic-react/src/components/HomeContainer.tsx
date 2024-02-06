import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { PaymentGateway } from '../types/PaymentGateway'
import './HomeContainer.css'

interface ContainerProps {}

const HomeContainer: React.FC<ContainerProps> = () => {
  const history = useHistory()
  const pgInstance = new PaymentGateway()

  /**
   * Set to false to process the postMessage from redirect webpage.
   * Check on file ./api/redirect.html on <script /> section
   * for its postMessage script
  **/
  const processInjectScript = true

  const handleCheckout = useCallback(async () => {
    const res = await pgInstance.createPurchase().then(res => res)
    const ref = InAppBrowser.create(res.checkout_url, '_blank')

    ref.on('loadstop').subscribe(param => {
      const { url } = param
      if (url.startsWith(PaymentGateway.redirectUrl)) {
        ref.executeScript({ code: `
            var urlParams = new URLSearchParams(window.location.search);
            var success = urlParams.get('success');
      
            setTimeout(() => {
              webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({
                "event": "paymentRedirect",
                "status": success === "true" ? "success" : "fail",
                "source": "app",
              }));
            }, 2000)
          `})
      }
    })

    ref.on('message').subscribe((event: any) => {
      const { data } = event
      if ((processInjectScript && data.source !== 'app') || (!processInjectScript && data.source === 'app')) return

      ref.close()
      history.push(`/redirect?status=${event.data.status}`)
    })
  }, [])


  return (
    <>
      <IonCard>
        <img
          alt='Silhouette of mountains'
          src='https://ionicframework.com/docs/img/demos/card-media.png'
        />
        <IonCardHeader>
          <IonCardTitle>Product Title</IonCardTitle>
          <IonCardSubtitle>Product Subtitle</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>{'Price: RM 55.00'}</IonCardContent>
        <IonButton onClick={handleCheckout} fill='clear'>
          {'Buy now'}
        </IonButton>
      </IonCard>
    </>
  )
}

export default HomeContainer
