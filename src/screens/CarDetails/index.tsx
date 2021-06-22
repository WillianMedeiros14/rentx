import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import { CarDTO } from '../../dtos/carDTO';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer
} from './styles';


interface Params {
    car: CarDTO;
}

export function CarDetails(){
    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirmHental(){
        navigation.navigate('Scheduling');
    }

    function handleBack(){
        navigation.goBack();
    }
    
    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>
            
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ ${car.rent.price}</Price>
                    </Rent>
                </Details>
                
                <Accessories>
                    {
                        car.accessories.map(accessory => {
                            console.log(accessory);
                            <Acessory 
                                key={accessory.type}
                                name={accessory.name}
                                icon={speedSvg} 
                            />
                        })
                    }
                </Accessories>
                

                <About>
                   {car.about}
                </About>
            </Content>

            <Footer>
                <Button title="Escolher príodo do aluguel" onPress={handleConfirmHental}/>
            </Footer>

        </Container>
    );
}