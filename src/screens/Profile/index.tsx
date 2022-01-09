import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

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

    const { user, signOut, updatedUser } = useAuth();

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    function handleBack(){
        navigation.goBack()
    }

    function handleSignOut(){
        signOut();
    }

    function handleOptionChage(selectedOption: 'dataEdit' | 'passwordEdit'){
        setOption(selectedOption);
    }

    async function handleSelectAvatar(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        if(result.uri){
            setAvatar(result.uri);
        }

    }

    async function handleProfileUpdate(){
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória.'),
                name: Yup.string().required('Nome é obrigatório.'),
            });

            const data = {name,driverLicense};
            await schema.validate(data);

            await updatedUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token
            });

            Alert.alert('Perfil atualizado!');
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa', error.message);
            }else{
                Alert.alert('Não foi possível atualizar o perfil');
            }
        }
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
                            <LogoutButton onPress={handleSignOut}>
                                <Feather 
                                    name="power" 
                                    size={24} 
                                    color={theme.colors.shape} 
                                />
                            </LogoutButton>
                        </HeaderTop>

                        <PhotoContainer>
                            { !!avatar && <Photo source={{ uri: avatar}} />}
                            <PhotoBtton onPress={handleSelectAvatar}>
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
                                        onChangeText={setName}
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
                                        onChangeText={setDriverLicense}
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

                            <Button
                                title='Salvar alterações'
                                onPress={handleProfileUpdate}
                            />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}