import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import HomeContainer from '../components/HomeContainer'
import './Home.css'

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Checkout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HomeContainer />
      </IonContent>
    </IonPage>
  )
}

export default Home