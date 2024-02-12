import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react'
import { checkmarkCircle, closeCircle } from 'ionicons/icons'
import { useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const PageRedirect: React.FC = () => {
  const history = useHistory()
  const query = useQuery()

  const status = query.get('status')

  const handleBack = () => {
    history.replace('/home')
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar></IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon
                icon={
                  status === 'success' ? checkmarkCircle : closeCircle
                }
                size='large'
                color={status === 'success' ? 'success' : 'danger'}
              />
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <span
              style={{
                color: `var(--ion-color-${status === 'success' ? 'success' : 'danger'})`,
              }}
            >
              Payment {`${status}`}
            </span>
            <br />
            <br />
            <IonButton onClick={handleBack} size='small'>
              {'Back to home'}
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default PageRedirect
