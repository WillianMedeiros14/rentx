import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Confirmation } from '../../confirmation';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep(){
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation();
    const theme = useTheme();
    const route = useRoute();

    const { user } = route.params as Params;
    //console.log(user);

    function handleBack(){
      navigation.goBack()
    }

    function handleRegister(){
      if(!password || !passwordConfirm){
        return Alert.alert('Informe a senha e a confirmação dela');
      }

      if(password != passwordConfirm){
        return Alert.alert('As senhas não são iguais');
      }

      //Enviar para api e cadastrar
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta criada',
        message: `Agora é so fazer Login\ne aproveitar`
      });
    }

    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <BackButton 
                onPress={handleBack}
              />
              
              <Steps>
                <Bullet active />
                <Bullet  />
              </Steps>
            </Header>

            <Title>
              Crie sua{'\n'}conta
            </Title>

            <SubTitle>
              Faça seu cadastro de{'\n'}
              forma rápida e fácil
            </SubTitle>

            <Form>
              <FormTitle>2. Senha</FormTitle>

              <PasswordInput
                iconName="lock"
                placeholder="Senha"
                onChangeText={setPassword}
                value={password}
              />

              <PasswordInput
                iconName="lock"            
                placeholder="Repetir senha"
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
              />

            </Form>

            <Button
              color={theme.colors.success}
              title="Cadastrar"
              onPress={handleRegister}
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}