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
import './HomeContainer.css'

interface ContainerProps {}

const products = [
  {
    price: 5500,
    name: 'Product Title',
    subtitle: 'Product Subtitle',
    image: 'https://ionicframework.com/docs/img/demos/card-media.png',
  },
]

const HomeContainer: React.FC<ContainerProps> = () => {
  const history = useHistory()

  const handleClick = useCallback(
    (data: { price: number; name: string; image: string }) => {
      history.push(`/checkout`, {
        data: data,
      })
    },
    [],
  )

  return (
    <>
      {products.map((x, i) => {
        return (
          <IonCard key={`products-${i}`}>
            <img alt={x.name} src={x.image} />
            <IonCardHeader>
              <IonCardTitle>{x.name}</IonCardTitle>
              <IonCardSubtitle>{x.subtitle}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>{`Price: RM ${x.price / 100}`}</IonCardContent>
            <IonButton onClick={() => handleClick(x)} fill='clear'>
              {'Buy now'}
            </IonButton>
          </IonCard>
        )
      })}
    </>
  )
}

export default HomeContainer
