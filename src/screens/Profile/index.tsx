import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

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
    OptionTitle,
    Section
} from './styles';

export function Profile(){
    const theme = useTheme();
    const navigation = useNavigation();

    const { user } = useAuth();

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
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        {
                            option === 'dataEdit' ?
                                <Section>
                                    <Input
                                        iconName='user'
                                        placeholder='Nome'
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                    />

                                    <Input
                                        iconName='mail'
                                        editable={false}
                                        defaultValue={user.email}
                                    />

                                    <Input
                                        iconName='credit-card'
                                        placeholder='CNH'
                                        keyboardType='numeric'
                                        defaultValue={user.driver_license}
                                    />
                                </Section>
                                :
                                <Section>
                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Senha atual'
                                    />

                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Nova senha'
                                    />

                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Confirmar senha'
                                    />
                                </Section>
                            }
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}