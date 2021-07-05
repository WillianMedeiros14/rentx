import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";


import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    withTiming,
    Extrapolate,
    runOnJS
} from "react-native-reanimated";

import{
    Container,
    
} from './styles';

export function Splash(){
    const SplashAnimation = useSharedValue(0);

    const navigation = useNavigation();
    
    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate( SplashAnimation.value,
                [0, 50], //etapas da animação
                [1, 0],
            ),
            transform: [
                {
                    translateX: interpolate(SplashAnimation.value,
                        [0, 50],
                        [0, -50],
                        Extrapolate.CLAMP
                    )
                }
            ],
        }
    })

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate( SplashAnimation.value,
                [0, 25, 50], //etapas da animação
                [0, .3, 1],
            ),
            transform: [
                {
                    translateX: interpolate(SplashAnimation.value,
                        [0, 50],
                        [-50, 0],
                        Extrapolate.CLAMP
                    )
                }
            ],
        }
    })

    function startApp(){
        navigation.navigate('Home');
    }

    useEffect(() => {
        SplashAnimation.value = withTiming(
            50,
            { duration: 1000 },
            () => {
                'woklet'
                runOnJS(startApp)();
            }
        );
    }, []);

    return (
        <Container>
            <Animated.View style={[brandStyle, {position: 'absolute'}]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>
            
            <Animated.View style={[logoStyle, {position: 'absolute'}]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    );
}