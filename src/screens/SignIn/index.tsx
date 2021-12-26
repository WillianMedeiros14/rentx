import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'

import { useAuth } from '../../hooks/auth';

import theme from '../../styles/theme';
import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer,
} from './styles';

export function SignIn(){
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    async function handleSigIn(){
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('A senha é obrgatória')
            });
    
            await schema.validate({ email, password })
            Alert.alert("Tudo certo");

            //Fazer login
            signIn({ email, password });
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa: ', error.message);
            } else {
                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                )
            }
        }
    }

    function handleNewAccount(){
        navigation.navigate('SignUpFirstStep')
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />

                    <Header>
                        <Title>
                            Estamos {`\n`}
                            quase lá.
                        </Title>
                        <SubTitle>
                            Faça seu login para começar {`\n`}
                            uma experiência incível.
                        </SubTitle>

                    </Header>

                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSigIn}
                            enabled={true}
                            loading={false}
                        />

                        <Button
                            title="Criar conta gratuita"
                            color={theme.colors.background_secondary}
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}