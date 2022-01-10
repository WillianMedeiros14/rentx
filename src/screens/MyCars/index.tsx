import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import { useTheme } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns'

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Car as ModelCar } from '../../databases/model/Car';
import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate
} from './styles';

interface DataProps {
    id: string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars(){
    const [cars, setCars] = useState<DataProps[]>([]);
    const[loading, setLoading] = useState(true);

    const screenIsFocus = useIsFocused();

    const navigation = useNavigation();
    const theme = useTheme();

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/rentals');

                const dataFormated = response.data.map((data: DataProps) => {
                    return {
                        id: data.id,
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
                    }
                });
           
                setCars(dataFormated);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        
        fetchCars();
    }, [screenIsFocus]);

      
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
                    Seus agendamentos,{'\n'}
                    estão aqui.
                </Title>

                <Subtitle>
                    Conforto, segurança e praticidade.
                </Subtitle>

            </Header>
            
            {loading ? <LoadAnimation /> : 
            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                    <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                </Appointments>

                <FlatList
                    data={cars}
                    keyExtractor={item => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CarWrapper>
                            <Car data={item.car} />
                            <CarFooter>
                                <CarFooterTitle>Período</CarFooterTitle>
                                <CarFooterPeriod>
                                    <CarFooterDate>{item.start_date}</CarFooterDate>
                                    <AntDesign
                                        name="arrowright"
                                        size={20}
                                        color={theme.colors.title}
                                        style={{ marginHorizontal: 10 }}
                                    />
                                    <CarFooterDate>{item.end_date}</CarFooterDate>
                                </CarFooterPeriod>
                            </CarFooter>
                        </CarWrapper>
                    )}
                />
            </Content>
            }
        </Container>
    );
}