import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';

import { Car as ModelCar } from '../../databases/model/Car';
import { CarDTO } from '../../dtos/carDTO';

import {
    Container,
    Header,
    CarImages,
    
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
    OfflineInfo
} from './styles';

interface Params {
    car: ModelCar;
}

export function CarDetails(){
    const navigation = useNavigation();
    const netInfo = useNetInfo();
    const route = useRoute();
    const { car } = route.params as Params;

    const theme = useTheme();

    const [ carUpdated, setCarUpdated ] = useState<CarDTO>({} as CarDTO);

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    });


    function handleConfirmHental(){
        navigation.navigate('Scheduling', { car });
    }

    function handleBack(){
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCarUpdated(){
            const response = await api.get(`/cars/${car.id}`);
            setCarUpdated(response.data);
        }

        if(netInfo.isConnected === true){
            fetchCarUpdated();
        }
    },[netInfo.isConnected]);
    
    return (
        <Container>
            <StatusBar
                 barStyle="dark-content"
                 translucent
                 backgroundColor="transparent"
            />

            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary }
                ]}
            >
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>

                <Animated.View style={sliderCarsStyleAnimation}>
                    <CarImages>
                        <ImageSlider imagesUrl={
                            !!carUpdated.photos ?
                            carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]
                        } />
                    </CarImages>
                </Animated.View>
            </Animated.View>
            
            <Animated.ScrollView 
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details> 
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
                    </Rent>
                </Details>
                
                {
                    carUpdated.accessories  &&
                    <Accessories>
                        {
                            carUpdated.accessories.map(accessory => (
                                <Acessory 
                                    key={accessory.type}
                                    name={accessory.name}
                                    icon={getAccessoryIcon(accessory.type)} 
                                />
                            ))
                        }
                    </Accessories>  
                }

                <About>
                   {car.about}
                </About>
            </Animated.ScrollView>


            <Footer>
                <Button 
                    title="Escolher príodo do aluguel" 
                    onPress={handleConfirmHental}
                    enabled={netInfo.isConnected === true}
                />

                {
                    netInfo.isConnected === false && 
                    <OfflineInfo>
                        Conect-se a Internet para ver mais detalhes e agendar seu carro.
                    </OfflineInfo>
                }
            </Footer>

        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    },
})