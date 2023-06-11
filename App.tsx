import React, {useState, useEffect} from 'react'
import {FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { MotiView } from 'moti'
import randomColor from "randomcolor";

const {width} = Dimensions.get('screen')
const numbers = [1,2,3,4,5,6,7,8,9,'', 0, 'del']
const dialPadSize = width * .2;
const dialPadTextSize = dialPadSize / 2
const _spacing = 20
const pinLength = 4;
const pinContainerSize = width /2;
const pinMaxSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinMaxSize - pinSpacing * 2

const baseColors = randomColor()

const _colors = {
    primary: baseColors,
    secondary: randomColor({
        hue: baseColors,
        luminosity:'dark'
    })
}

const DialPad = ({onPress}: {onPress: (item: typeof numbers[number])=> void}) =>{
  return (
      <FlatList
          numColumns={3}
          scrollEnabled={false}
          data={numbers}
          columnWrapperStyle={{
            gap:_spacing
          }}
          contentContainerStyle={{
            gap: _spacing
          }}
          keyExtractor={(data, index)=> index.toString()}
          renderItem={({item})=> {
            return (
               <TouchableOpacity
                   disabled={item === ''}
                   onPress={()=> onPress(item)}
               >
                   <View
                       style={{
                           borderWidth:  typeof item !== 'number' ? 0 : 1,
                           borderColor: _colors.secondary,
                           borderRadius:dialPadSize,
                           width:dialPadSize,
                           height:dialPadSize,
                           alignItems:'center',
                           justifyContent:'center'
                       }}
                   >
                       {item === 'del' ?
                           <Ionicons
                               color={_colors.secondary}
                               name='backspace-outline'
                               size={dialPadTextSize}
                           />
                           :   <Text
                               style={{
                                   fontSize:dialPadTextSize,
                                   color:_colors.secondary
                               }}
                           >
                               {item}
                           </Text>
                       }
                   </View>
               </TouchableOpacity>

            )
          }}
          style={{
            flexGrow:0,

          }}
      />
  )
}

export default function App() {
const [code, setCode] = useState<Array<number>>([])

  return (
    <View style={styles.container}>
    <View style={{
        flexDirection:'row',
        gap: pinSpacing * 2,
        marginBottom: _spacing * 2,
        height: pinSize *2,
        alignItems:'flex-end'
    }}>
        {[...Array(pinLength).keys()].map((i)=>{
            const isSelected = code[i] !== undefined && code[i] !== null;
            return <MotiView
                key={i}
                style={{
                    width:pinSize,
                    borderRadius:pinSize,
                    backgroundColor:_colors.secondary,
                }}
                transition={{
                    type:'timing',
                    duration: 300
                }}
                animate={{
                    height:isSelected ? pinSize : 2,
                    marginBottom: isSelected ? pinSize : 0,
                    backgroundColor: isSelected ? _colors.secondary : `${_colors.secondary}33`
                }}
            />
        })}
    </View>
      <DialPad onPress={(item)=> {
          if (item === 'del'){
              setCode((prevCode)=> prevCode.slice(0,prevCode.length - 1))
          }else if (typeof item ==='number'){
              if (code.length === pinLength) return
              setCode((prevCode)=> [...prevCode, item])
          }
      }}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
