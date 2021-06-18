import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from './styles';

export function Home(){
    const navigation = useNavigation();

    const carData = {
        brand: 'Audi',
        name: 'RS 5 Copé',
        rent: {
        period: 'AO DIA',
        price: 120,
    },
        thumbnail: 'https://img2.gratispng.com/20171202/1b1/audi-png-picture-5a228075ee1b68.9154536215122105499753.jpg'
    }

    
    function handleCarDetails(){
        navigation.navigate('CarDetails');
    }


    return (
        <Container>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo  
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />

                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            
            <CarList
                data={[1,2,3, 4,5]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => 
                    <Car data={carData} onPress={handleCarDetails} />
                }
            />
           
        </Container>
    );
}