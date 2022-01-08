import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoBtton
} from './styles';

export function Profile(){
    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack(){
        navigation.goBack()
    }

    function handleSignUp(){

    }

    return(
        <Container>
            <Header>
                <HeaderTop>
                    <BackButton 
                        color={theme.colors.shape} 
                        onPress={handleBack} 
                    />
                    <HeaderTitle>Editar perfil</HeaderTitle>
                    <LogoutButton onPress={handleSignUp}>
                        <Feather 
                            name="power" 
                            size={24} 
                            color={theme.colors.shape} 
                        />
                    </LogoutButton>
                </HeaderTop>

                <PhotoContainer>
                    <Photo source={{ uri: 'https://github.com/WillianMedeiros14.png'}} />
                    <PhotoBtton onPress={() => {}}>
                        <Feather
                            name='camera'
                            size={24}
                            color={theme.colors.shape}
                        />
                    </PhotoBtton>
                </PhotoContainer>
            </Header>
        </Container>
    );
}