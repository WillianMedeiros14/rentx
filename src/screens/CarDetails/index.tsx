import React from 'react';
import { useNavigation } from '@react-navigation/native';

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
    Acessories,
    Footer
} from './styles';

export function CarDetails(){
    const navigation = useNavigation();

    function handleConfirmHental(){
        navigation.navigate('Scheduling');
    }
    
    return (
        <Container>
            <Header>
                <BackButton onPress={() => {}} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={['https://img2.gratispng.com/20171202/1b1/audi-png-picture-5a228075ee1b68.9154536215122105499753.jpg']} />
            </CarImages>
            
            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>
                    
                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>
                
                <Acessories>
                    <Acessory name="380Km/h" icon={speedSvg} />
                    <Acessory name="3.2s" icon={accelerationSvg} />
                    <Acessory name="800 HP" icon={forceSvg} />
                    <Acessory name="Gasoline" icon={gasolineSvg} />
                    <Acessory name="Auto" icon={exchangeSvg} />
                    <Acessory name="2 pessoas" icon={peopleSvg} />
                </Acessories>
                

                <About>
                    Este é um automóvel desportivo. Surgiu do lendário touro de lide indultado
                    na praça Real Maestranza de Servilla. é um belíssimo carro para quem goata de acelerar. 
                </About>
            </Content>

            <Footer>
                <Button title="Escolher príodo do aluguel" onPress={handleConfirmHental}/>
            </Footer>

        </Container>
    );
}