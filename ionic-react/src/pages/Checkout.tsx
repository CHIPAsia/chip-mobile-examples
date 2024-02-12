import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { chevronBack } from 'ionicons/icons'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import CheckoutContainer from '../components/CheckoutContainer'

const Checkout: React.FC = () => {
  const history = useHistory()

  const handleBack = useCallback(() => {
    history.replace('/home')
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton fill='clear' onClick={handleBack}>
          <IonIcon icon={chevronBack} />
          Back
        </IonButton>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Checkout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CheckoutContainer />
      </IonContent>
    </IonPage>
  )
}

export default Checkout
