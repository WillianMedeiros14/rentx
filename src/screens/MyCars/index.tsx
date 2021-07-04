import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components/native';


import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/carDTO';
import { api } from '../../services/api';

import theme from '../../styles/theme';
import {
    Container,
    Header,
    Title,
    Subtitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity
} from './styles';

interface CarProps {
    id: string;
    user_id:string;
    car: CarDTO;
}

export function MyCars(){
    const [cars, setCars] = useState<CarProps[]>([]);
    const[loading, setLoading] = useState(true);

    const navigation = useNavigation();
    const theme = useTheme();

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
           
                setCars(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        
        fetchCars();
    }, []);

      
    function handleBack(){
        navigation.goBack();
    }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />

                <BackButton
                    onPress={handleBack} 
                    color={theme.colors.shape}
                />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <Subtitle>
                    Conforto, segurança e praticidade.
                </Subtitle>

            </Header>

            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                    <AppointmentsQuantity>05</AppointmentsQuantity>
                </Appointments>

                <FlatList
                    data={cars}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Car data={item.car} />
                    )}
                />
            </Content>
        </Container>
    );
}