import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
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
    Acessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal
} from './styles';

export function SchedulingDetails(){
    const theme = useTheme();    

    const navigation = useNavigation();

    function handleConfirmHental(){
        navigation.navigate('SchedulingComplete');
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
               
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>
                    
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />
                    
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>20/06/2021</DateValue>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ 580 X3 diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>

            </Content>

            <Footer>
                <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirmHental}/>
            </Footer>

        </Container>
    );
}