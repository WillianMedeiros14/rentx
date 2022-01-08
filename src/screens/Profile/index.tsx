import React, { useState } from 'react';
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
    PhotoBtton,
    Content,
    Options,
    Option,
    OptionTitle
} from './styles';

export function Profile(){
    const theme = useTheme();
    const navigation = useNavigation();

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

    function handleBack(){
        navigation.goBack()
    }

    function handleSignUp(){

    }

    function handleOptionChage(selectedOption: 'dataEdit' | 'passwordEdit'){
        setOption(selectedOption);
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

            <Content>
                <Options>
                    <Option active={option === 'dataEdit'}
                        onPress={() => handleOptionChage('dataEdit')}
                    >
                        <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
                    </Option>

                    <Option active={option === 'passwordEdit'}
                        onPress={() => handleOptionChage('passwordEdit')}
                    >
                        <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
                    </Option>
                </Options>
            </Content>
        </Container>
    );
}